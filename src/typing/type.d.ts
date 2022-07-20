declare interface VoiceProps {
    text: string;
    audio: string;
}

declare interface MeaningProps {
    id: number;
    partOfSpeech: string;
    definitions: {
        definition: string;
        example: string;
    }[];
}

declare interface QueryResultProps {
    word: string;
    phonetic: string;
    phonetics?: VoiceProps[];
    meanings: MeaningProps[];
}

declare interface QueryFailed {
    title: string;
    message: string;
    resolution: string;
}

declare interface DialogPositionProps {
    left: number;
    top: number;
}

declare interface DictionaryContextProps {
    keyword: string;
    setKeyword: (e: string) => void;
    setDialogPosition: (e: DialogPositionProps) => void;
    dialogPosition: DialogPositionProps;
}

declare interface DictionaryProps {
    queryWord: string;
}
