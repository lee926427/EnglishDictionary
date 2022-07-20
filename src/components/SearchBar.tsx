import { useContext, ChangeEvent } from "react";
import { DictionaryContext } from "../App";
export default function SearchBar() {
    const { setKeyword } = useContext(DictionaryContext);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    return (
        <div className="w-1/2 px-2 py-1 rouned flex items-center">
            <label className="px-2">
                <i className="fa fa-search 2x"></i>
            </label>
            <input
                type="text"
                className="w-full h-10 peer-focus bg-gray-300 rounded ml-1 px-1 outline-none "
                onChange={handleSearch}
            />
        </div>
    );
}
