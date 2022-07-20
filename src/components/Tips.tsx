import { useState } from "react";
import clsx from "clsx";
export default function Tips({ word, phonetic, meanings }: QueryResultProps) {
    const [pageIndex, setPageIndex] = useState(0);
    const Meaning = ({ partOfSpeech, definitions, id }: MeaningProps) => {
        return (
            <li
                className={clsx({
                    block: pageIndex === id,
                    hidden: pageIndex !== id,
                })}
            >
                <div className="font-medium">{partOfSpeech}</div>
                <div>{definitions[0].example}</div>
            </li>
        );
    };
    return (
        <dialog
            open={word ? true : false}
            className="rounded shadow-2xl filter backdrop"
            style={{
                width: "20rem",
                backgroundColor: "rgba(250,250,250,0.76)",
            }}
        >
            <header>
                <div className="text-lg font-bold">{word}</div>
            </header>
            <div className="text-sm font-medium italic">{phonetic}</div>
            <h2 className="text-lg font-medium mt-2">meanings</h2>
            <hr />
            <ul>
                {meanings.map((meaning, index) => (
                    <Meaning
                        key={meaning.partOfSpeech}
                        id={index}
                        partOfSpeech={meaning.partOfSpeech}
                        definitions={meaning.definitions}
                    />
                ))}
            </ul>
            <ul>
                {meanings.map((meaning, index) => (
                    <input
                        type="radio"
                        className="mx-1"
                        name="option"
                        key={index}
                        checked={pageIndex === index}
                        onChange={() => setPageIndex(index)}
                    />
                ))}
            </ul>
        </dialog>
    );
}
