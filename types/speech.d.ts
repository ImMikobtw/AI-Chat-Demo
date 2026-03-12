interface SpeechRecognitionEvent {
    results: {
        [key: number]: {
            [key: number]: {
                transcript: string;
            };
        };
    };
}

interface SpeechRecognition {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;

    start: () => void;
    stop: () => void;

    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: (() => void) | null;
    onend: (() => void) | null;
}

interface SpeechRecognitionConstructor {
    new (): SpeechRecognition;
}

interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
}