import * as React from 'react';

interface IIndicatorProps {
    winner: boolean;
}

function getClass(winner: boolean): string {
    return winner ? 'indicator indicator--winner' : 'indicator';
}

export default ({ winner }: IIndicatorProps) => (
    <div className={getClass(winner)}></div>
);