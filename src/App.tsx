import {
    useState,
    createContext,
    useContext,
    useCallback,
    useEffect,
} from "react";
import { useSpring, animated } from "react-spring";
import { Tips, SearchBar, QueryParagraph } from "./components";
import _ from "lodash";
export const DictionaryContext = createContext({} as DictionaryContextProps);

function Dictionary({ queryWord }: DictionaryProps) {
    const { dialogPosition } = useContext(DictionaryContext);
    const [queryResult, setQueryResult] = useState<
        QueryResultProps[] | QueryFailed | null
    >(null);
    const PopupAnimate = useSpring(
        queryWord.length
            ? {
                  opacity: 1,
                  left: dialogPosition.left,
                  top: dialogPosition.top + 26,
                  delay: 200,
              }
            : {
                  opacity: 0,
                  left: dialogPosition.left,
                  top: dialogPosition.top - 20,
              }
    );
    const getVocabulary = async (word: string) => {
        if (word.length) {
            const payload = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            const result = await payload.json();
            console.log("getVocabulary", result);
            setQueryResult(result);
        } else {
            setQueryResult(null);
        }
    };
    const debounceLoadData = useCallback(_.debounce(getVocabulary, 1000), []);
    useEffect(() => {
        if (queryWord !== null) debounceLoadData(queryWord);
    }, [queryWord, debounceLoadData]);
    if (queryResult && Array.isArray(queryResult)) {
        return (
            <animated.div className="absolute" style={PopupAnimate}>
                <Tips
                    word={queryResult[0].word}
                    phonetic={queryResult[0].phonetic}
                    meanings={queryResult[0].meanings}
                />
            </animated.div>
        );
    } else {
        return (
            <animated.div className="absolute" style={PopupAnimate}>
                <div className="h-24 w-64 bg-gray-100 flex justify-center items-center">
                    <span>查無此單字</span>
                </div>
            </animated.div>
        );
    }
}

export default function App() {
    const [keyword, setKeyword] = useState("");
    const [dialogPosition, setDialogPosition] = useState({ left: 0, top: 0 });
    return (
        <div className="App bg-gray-100 h-screen flex flex-col justify-center items-center">
            <DictionaryContext.Provider
                value={{
                    dialogPosition,
                    setDialogPosition,
                    keyword,
                    setKeyword,
                }}
            >
                <h1 className="font-bold text-gray-800 text-2xl py-2">
                    Find Term and Dictionary
                </h1>
                <SearchBar />
                <article className="w-1/2 shadow-lg mt-6 p-4 rounded bg-white text-gray-800 font-semibold relative">
                    <QueryParagraph keyword={keyword}>
                        Just that," said the fox. "To me, you are still nothing
                        more than a little boy who is just like a hundred
                        thousand other little boys. And I have no need of you.
                        And you, on your part, have no need of me. To you, I am
                        nothing more than a fox like a hundred thousand other
                        foxes. But if you tame me, then we shall need each
                        other. To me, you will be unique in all the world. To
                        you, I shall be unique in all the world...
                    </QueryParagraph>
                    <Dictionary queryWord={keyword} />
                </article>
            </DictionaryContext.Provider>
        </div>
    );
}
