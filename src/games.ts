export interface IArticleBody {
    type: 'plaintext' | 'h2' | 'pull_quote';
    body: string;
}

export interface IPlayer {
    name: string;
    score: number;
}

interface ISet {
    scoreA: number;
    scoreB: number;
}

export interface IGame {
    playerA: IPlayer;
    playerB: IPlayer;
    sets?: ISet[];
}

export const GAMES: IGame[] = [
    {
        playerA: {
            name: 'Kerge Kotzher',
            score: 4
        },
        playerB: {
            name: 'Emily M. Mills',
            score: 2
        },
        sets: [
            { scoreA: 11, scoreB: 7 },
            { scoreA: 11, scoreB: 9 },
            { scoreA: 11, scoreB: 3 },
            { scoreA: 9, scoreB: 11 },
            { scoreA: 7, scoreB: 11 },
            { scoreA: 11, scoreB: 8 }
        ]
    },
    {
        playerA: {
            name: 'Oronzo Gallo',
            score: 0
        },
        playerB: {
            name: 'Leo Matić',
            score: 3
        },
        sets: [
            { scoreA: 3, scoreB: 11 },
            { scoreA: 7, scoreB: 11 },
            { scoreA: 0, scoreB: 6 }
        ]
    },
    {
        playerA: {
            name: 'Nicole C. Lewis',
            score: 1
        },
        playerB: {
            name: 'Feng Yang',
            score: 2
        },
        sets: [
            { scoreA: 6, scoreB: 11 },
            { scoreA: 14, scoreB: 12 },
            { scoreA: 4, scoreB: 11 }
        ]
    }
]