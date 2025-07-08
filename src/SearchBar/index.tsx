import React, { useState, useEffect } from "react";
import {Input, SvgIcon, Button, ButtonVariantType} from 'basicui';
import FilterSection from "./FilterSection";
import { SearchBarFilterType } from "../types/SearchBarFilterType";

type SearchPayload = {
    searchText: string;
    filters: {
        fieldName: string;
        selectedValueList: (string | number)[];
    }[];
};

export type SearchBarProps = {
    onSearch: (data: SearchPayload) => void;
    filters: SearchBarFilterType[];
    placeholder?: string;
};

/**
 * Component to render search bar with advanced options.
 */
const SearchBar = (props: SearchBarProps) => {
    const [searchText, setSearchText] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, (string | number)[]>>({});
    const [advancedSearchText, setAdvancedSearchText] = useState(''); // State for advanced section filter

    const toggleFilter = (field: string, valueId: string | number) => {
        setSelectedFilters(prev => {
            const currentValues = prev[field] || [];
            const newValues = currentValues.includes(valueId)
                ? currentValues.filter(id => id !== valueId)
                : [...currentValues, valueId];
            return { ...prev, [field]: newValues };
        });
    };

    const handleSearch = () => {
        const resultFilters = Object.entries(selectedFilters).map(([fieldName, selectedValueList]) => ({
            fieldName,
            selectedValueList
        }));
        props.onSearch({ searchText, filters: resultFilters });
        setShowAdvanced(false);
    };

    const clearFilters = () => {
        setSelectedFilters({});
        // setShowAdvanced(false);
    };

    // Filter the filters' field values based on advancedSearchText
    const filteredFilters = props.filters.map(filter => ({
        ...filter,
        fieldValues: filter.fieldValues.filter(value =>
            value.label.toLowerCase().includes(advancedSearchText.toLowerCase())
        )
    }));

    return (
        <div className="basicui-searchbar">
            <div className="basicui-searchbar__input">
                <button className="basicui-searchbar__input__action-left" onClick={() => setShowAdvanced(prev => !prev)}>
                    <SvgIcon src={showAdvanced ? "/icons/fontawesome/up.svg" : "/icons/fontawesome/down.svg"} height="16px" width="16px" />
                </button>
                <input
                    className="basicui-searchbar__input__text"
                    placeholder={props.placeholder || "Search..."}
                    value={searchText}
                    autoFocus
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />
                {searchText && searchText !== "" && <button className="basicui-searchbar__input__action-beforeright" onClick={() => setSearchText("")}>
                    <SvgIcon src="/icons/fontawesome/close.svg" height="14px" width="14px" />
                </button>}
                <button className="basicui-searchbar__input__action-right" onClick={handleSearch}>
                    <SvgIcon src="/icons/fontawesome/search.svg" height="16px" width="16px" />
                </button>
            </div>

            {showAdvanced && (
                <div className="basicui-searchbar__advanced">
                    <div className="basicui-searchbar__advanced__header">
                        <div className="basicui-searchbar__advanced__header__action">
                            <Button onClick={clearFilters} variant={ButtonVariantType.fill}>
                                <SvgIcon src="/icons/fontawesome/filter-close.svg" height="14px" width="14px" />Clear
                            </Button>
                            {/* <Button onClick={handleSearch} theme={ThemeType.primary}>
                                <SvgIcon src="/icons/fontawesome/filter.svg" height="14px" width="14px" />Apply
                            </Button> */}
                        </div>
                        <Input
                            className="basicui-searchbar__advanced__header__searchtext"
                            type="text"
                            placeholder="Search filters..."
                            value={advancedSearchText}
                            onChange={(e: any) => setAdvancedSearchText(e.currentTarget.value)}
                        />
                    </div>
                    <div className="basicui-searchbar__advanced__main">
                        {filteredFilters.map(filter => (
                            <FilterSection
                                key={filter.fieldName}
                                fieldLabel={filter.fieldLabel}
                                fieldName={filter.fieldName}
                                fieldValues={filter.fieldValues}
                                selectedFilters={selectedFilters}
                                toggleFilter={toggleFilter}
                            />
                        ))}
                    </div>
                    {/* <div className="basicui-searchbar__advanced__footer">
                        <Button onClick={clearFilters}>Clear</Button>
                        <Button onClick={handleSearch} theme={ThemeType.primary}>Apply</Button>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
