import { useIsFetching } from '@tanstack/react-query';

export const GlobalLoader = () => {
    const isFetching = useIsFetching();

    if (!isFetching) return null;

    return (
        <div
        style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #1e90ff)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
            zIndex: 9,
        }}
        />
    );
};