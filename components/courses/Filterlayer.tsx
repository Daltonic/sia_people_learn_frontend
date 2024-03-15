import * as React from 'react'
import SearchInput from '../reusableComponents/SearchInput'
import Filters from '../reusableComponents/Filters'

interface Props {
  searchPlaceholder: string
  route: string
  sortLabel?: string
  sortOptions?: {
    name: string
    value: string
  }[]
  filterLabel?: string
  filterOptions?: {
    name: string
    value: string
  }[]
}

const Filterlayer: React.FC<Props> = ({
  searchPlaceholder,
  route,
  filterLabel,
  filterOptions,
  sortLabel,
  sortOptions,
}) => {
  return (
    <div className="md:flex-row flex flex-col md:items-center justify-between gap-1 mt-2 w-full">
      <SearchInput placeholder={searchPlaceholder} route={route} />

      <div className="flex items-center gap-4 md:gap-8 overflow-x-auto" >
        <div>
          {filterLabel && filterOptions && (
            <Filters
              options={filterOptions!}
              label={filterLabel!}
              type="difficulty"
            />
          )}
        </div>
          {sortOptions && sortLabel && (
            <Filters options={sortOptions} label={sortLabel} type="filter" />
          )}
      </div>
    </div>
  )
}

export default Filterlayer
