import {
    useEffect,
    useCallback,
    useRef,
    useContext,
    HTMLAttributes,
    ReactNode,
} from "react";
import { DictionaryContext } from "../App";

interface QueryParagraphProps extends HTMLAttributes<HTMLDivElement> {
    keyword: string;
    children?: ReactNode;
}

export default function QueryParagraph({
    keyword,
    children,
}: QueryParagraphProps) {
    const { setDialogPosition } = useContext(DictionaryContext);
    const paragraphRef = useRef(null);
    const replaceWord = (keyword: string): string => {
        if (typeof children === "string" && keyword.length !== 0) {
            const reg = new RegExp(`(${keyword})`, "gi");
            const paragraph = children.replace(
                reg,
                '<mark class="text-gray-100 bg-gray-900 px-2 py-1 rounded">$1</mark>'
            );
            return paragraph;
        }
        return children;
    };
    const getRefPosition = useCallback(
        (ref: HTMLElement) => {
            const vocabularies = ref.children;
            if (vocabularies.length) {
                setDialogPosition({
                    left: vocabularies[0].offsetLeft,
                    top: vocabularies[0].offsetTop,
                });
            } else {
                setDialogPosition({
                    left: 0,
                    top: 0,
                });
            }
        },
        [setDialogPosition]
    );
    useEffect(() => {
        if (keyword.length !== 0 && paragraphRef.current)
            getRefPosition(paragraphRef.current);
    }, [keyword, getRefPosition]);
    return (
        <p
            ref={paragraphRef}
            dangerouslySetInnerHTML={{ __html: replaceWord(keyword) }}
        />
    );
}
