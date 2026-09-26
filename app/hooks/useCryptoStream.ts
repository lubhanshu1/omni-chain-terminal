import { useState, useEffect } from 'react';

type StreamStatus = 'connecting' | 'connected' | 'reconnecting' | 'offline';

export function useCryptoStream() {
    const [price, setPrice] = useState<string>('--');
    const [volatility, setVolatility] = useState<number>(0.15);
    const [is24hUp, setIs24hUp] = useState<boolean>(true);
    const [status, setStatus] = useState<StreamStatus>('connecting');

    useEffect(() => {
        let ws: WebSocket | null = null;
        let retryTimer: ReturnType<typeof setTimeout> | null = null;
        let disposed = false;
        let retryMs = 1000;

        const connect = () => {
            if (disposed) return;
            setStatus(retryMs === 1000 ? 'connecting' : 'reconnecting');

            try {
                ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
            } catch {
                scheduleRetry();
                return;
            }

            ws.onopen = () => {
                retryMs = 1000;
                setStatus('connected');
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    const close = Number(data?.c);
                    const change = Number(data?.p);
                    const changePercent = Number(data?.P);

                    if (!Number.isFinite(close) || !Number.isFinite(change) || !Number.isFinite(changePercent)) {
                        return;
                    }

                    setPrice(close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                    setIs24hUp(change >= 0);

                    const normalizedVolatility = Math.min(Math.max(Math.abs(changePercent) / 5, 0.05), 1);
                    setVolatility(normalizedVolatility);
                } catch {
                    // Ignore malformed stream messages without breaking the dashboard.
                }
            };

            ws.onerror = () => {
                setStatus('offline');
                ws?.close();
            };

            ws.onclose = () => {
                if (!disposed) scheduleRetry();
            };
        };

        const scheduleRetry = () => {
            if (disposed || retryTimer) return;
            setStatus('reconnecting');
            retryTimer = setTimeout(() => {
                retryTimer = null;
                retryMs = Math.min(retryMs * 2, 30000);
                connect();
            }, retryMs);
        };

        connect();

        return () => {
            disposed = true;
            if (retryTimer) clearTimeout(retryTimer);
            retryTimer = null;
            ws?.close();
            ws = null;
        };
    }, []);

    return { price, volatility, is24hUp, status };
}