import { useState, useEffect } from 'react';

export function useCryptoStream() {
    const [price, setPrice] = useState<string>('0.00');
    const [volatility, setVolatility] = useState<number>(0.15);
    const [is24hUp, setIs24hUp] = useState<boolean>(true);

    useEffect(() => {
        // Connect directly to Binance raw aggregate trade WebSocket stream for BTC/USDT
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // c: Current close price, p: Price change, P: Price change percent
            if (data.c) {
                setPrice(parseFloat(data.c).toLocaleString(undefined, { minimumFractionDigits: 2 }));
                setIs24hUp(parseFloat(data.p) >= 0);

                // Mathematically map the absolute 24h price change percentage to our shader's volatility spectrum [0.0 - 1.0]
                const rawPercent = Math.abs(parseFloat(data.P));
                const normalizedVolatility = Math.min(Math.max(rawPercent / 5, 0.05), 1.0);
                setVolatility(normalizedVolatility);
            }
        };

        ws.onerror = (err) => console.error('WebSocket Streaming Error:', err);
        return () => ws.close();
    }, []);

    return { price, volatility, is24hUp };
}