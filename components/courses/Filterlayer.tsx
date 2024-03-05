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
    <div className="md:flex-row flex flex-col md:items-center justify-between gap-4 mt-5">
      <div className="text-sm flex gap-2 ">
        <p className=" text-slate-600">Showing </p>
        <p className="font-medium text-violet-950">250</p>
        <p className=" text-slate-600"> total results</p>
      </div>

      <SearchInput placeholder={searchPlaceholder} route={route} />
      
      <div className="flex items-center gap-2 md:gap-4">
        {filterLabel && filterOptions && (
          <Filters
            options={filterOptions!}
            label={filterLabel!}
            type="difficulty"
          />
        )}
        {sortOptions && sortLabel && (
          <Filters options={sortOptions} label={sortLabel} type="filter" />
        )}
      </div>
    </div>
  )
}

export default Filterlayer
