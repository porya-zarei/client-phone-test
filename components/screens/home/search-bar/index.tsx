import {FC, useState, useTransition} from "react";
import {StyleSheet} from "react-native";
import {useChatsContext} from "../../../../contexts/chats-context";
import {useAppTheme} from "../../../../theme";
import CInput from "../../../core/input";
import CView from "../../../core/view";

interface SearchBarProps {}

const styles = StyleSheet.create({
    searchInputContainer: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        width: "100%",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
});

const SearchBar: FC<SearchBarProps> = () => {
    const {colors} = useAppTheme();
    const [search, setSearch] = useState("");
    const [isPending, startTransition] = useTransition();
    const {filteredChats, chats, changeFilteredChats} = useChatsContext();
    const handleSearch = (text: string) => {
        setSearch(text);
        startTransition(() => {
            if (text?.length > 0) {
                changeFilteredChats(
                    chats.filter(
                        (chat) =>
                            chat.name.includes(text) || chat.id.includes(text),
                    ),
                );
            } else {
                changeFilteredChats(chats);
            }
        });
    };
    return (
        <CView style={styles.searchInputContainer}>
            <CInput
                text={search}
                onChangeText={handleSearch}
                containerStyle={{
                    ...styles.searchInput,
                    borderColor: "transparent",
                    borderWidth: 0,
                    backgroundColor: colors.grayLight,
                    opacity: 0.7,
                }}
                inputStyle={{color: colors.text}}
                placeholder="جستوجو ..."
                placeHolderTextColor={colors.text}
            />
        </CView>
    );
};

export default SearchBar;
