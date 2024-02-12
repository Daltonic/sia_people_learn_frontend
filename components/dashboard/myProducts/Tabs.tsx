'use client'
import React, { useEffect, useState } from 'react'
import MyCourseCard from './MyCourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '@/store/userSlice'
import { IAcademies, ICourses, RootState } from '@/utils/type.dt'
import EmptyComponent from '@/components/reusableComponents/EmptyComponent'
import { CiSearch } from 'react-icons/ci'
import LocalPagination from '@/components/reusableComponents/LocalPagination'
import LocalFilters from '@/components/reusableComponents/LocalFilter'

interface Props {
  academiesData: IAcademies
  coursesData: ICourses
  booksData: ICourses
}

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Oldest', value: 'oldest' },
]

const filterOptions = [
  { name: 'Beginner', value: 'Beginner' },
  { name: 'Intermediate', value: 'Intermediate' },
  { name: 'Advanced', value: 'Advanced' },
]

const Tabs: React.FC<Props> = ({ academiesData, coursesData, booksData }) => {
  const dispatch = useDispatch()
  const { setUserData } = userActions
  const { userData } = useSelector((states: RootState) => states.userStates)

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState<string>('')
  const [difficulty, setDifficulty] = useState<string>('')
  const [sort, setSort] = useState<string>('newest')

  const [academiesObj, setAcademiesObj] = useState<IAcademies>(academiesData)
  const [coursesObj, setCoursesObj] = useState<ICourses>(coursesData)
  const [booksObj, setBooksObj] = useState<ICourses>(booksData)

  const [activeTab, setActiveTab] = useState<number>(1)
  const [pageNumbers, setPageNumbers] = useState(coursesObj.numOfPages)
  const [type, setType] = useState<'Course' | 'Book' | 'Academy'>('Course')
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>(
    'Search Courses Here...'
  )

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber)
    if (tabNumber === 1) {
      setType('Course')
      setSearchPlaceholder('Search Courses Here...')
      setPageNumbers(coursesObj.numOfPages)
      setCurrentPage(1)
    }
    if (tabNumber === 2) {
      setType('Book')
      setSearchPlaceholder('Search Books Here...')
      setPageNumbers(booksObj.numOfPages)
      setCurrentPage(1)
    }
    if (tabNumber === 3) {
      setType('Academy')
      setSearchPlaceholder('Search Academies Here...')
      setPageNumbers(academiesObj.numOfPages)
      setCurrentPage(1)
    }
  }

  const updateSearch = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    }

    try {
      if (activeTab === 1) {
        const url = `${
          process.env.NEXT_PUBLIC_BACKEND_URI
        }/api/v1/courses?instructor=true&type=Course&searchQuery=${search}&page=${Number(
          currentPage || 1
        )}&filter=${sort}${difficulty && `&difficulty=${difficulty}`}`
        const response = await fetch(url, requestOptions)

        if (response.status === 400) {
          alert('Something went wrong')
        }
        const result = (await response.json()) as ICourses
        setCoursesObj(result)
      } else if (activeTab === 2) {
        const url = `${
          process.env.NEXT_PUBLIC_BACKEND_URI
        }/api/v1/courses?instructor=true&type=Book&searchQuery=${search}&page=${Number(
          currentPage || 1
        )}&filter=${sort}${difficulty && `&difficulty=${difficulty}`}`

        const response = await fetch(url, requestOptions)

        if (response.status === 400) {
          alert('Something went wrong')
        }
        const result = (await response.json()) as ICourses
        setBooksObj(result)
      } else {
        const url = `${
          process.env.NEXT_PUBLIC_BACKEND_URI
        }/api/v1/academies?instructor=true&searchQuery=${search}&page=${Number(
          currentPage || 1
        )}&filter=${sort}${difficulty && `&difficulty=${difficulty}`}`
        const response = await fetch(url, requestOptions)

        if (response.status === 400) {
          alert('Something went wrong')
        }
        const result = (await response.json()) as IAcademies
        setAcademiesObj(result)
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (search) {
      const delaydebounceFn = setTimeout(() => {
        updateSearch()
      }, 300)

      return () => clearTimeout(delaydebounceFn)
    } else {
      updateSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage, sort, difficulty])

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <div className="flex items-center justify-evenly">
          <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-5 md:mb-0 md:w-96">
            <CiSearch className="text-[#4F547B] text-xl" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <LocalFilters
            label="Filter by Difficulty"
            options={filterOptions}
            currFilter={difficulty}
            setCurrFilter={setDifficulty}
          />
          <LocalFilters
            label="Order By"
            options={sortOptions}
            currFilter={sort}
            setCurrFilter={setSort}
          />
        </div>
        <div className="flex space-x-5 border-b">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? 'border-[#C5165D] text-[#C5165D]'
                : 'border-transparent hover:border-gray-200'
            }`}
            type="button"
          >
            Courses
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 2
                ? 'border-[#C5165D] text-[#C5165D]'
                : 'border-transparent hover:border-gray-200'
            }`}
            type="button"
          >
            Books
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 3
                ? 'border-[#C5165D] text-[#C5165D]'
                : 'border-transparent hover:border-gray-200'
            }`}
            type="button"
          >
            Academy
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 && (
            <div className="flex justify-between gap-5 w-full flex-wrap">
              {coursesObj &&
              coursesObj.courses &&
              coursesObj.courses.length > 0 ? (
                coursesObj.courses.map((elm, i: number) => (
                  <MyCourseCard data={elm} key={i} type={type} />
                ))
              ) : (
                <EmptyComponent
                  title="No Products Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div className="flex justify-between gap-5 w-full flex-wrap">
              {booksObj.courses && booksObj.courses.length > 0 ? (
                booksObj.courses.map((elm, i: number) => (
                  <MyCourseCard data={elm} key={i} type={type} />
                ))
              ) : (
                <EmptyComponent
                  title="No Products Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )}
          {activeTab === 3 && (
            <div className="flex justify-between gap-5 w-full flex-wrap">
              {academiesObj.academies && academiesObj.academies.length > 0 ? (
                academiesObj.academies.map((elm, i: number) => (
                  <MyCourseCard data={elm} key={i} type={type} />
                ))
              ) : (
                <EmptyComponent
                  title="No Products Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )}
        </div>
      </div>
      {pageNumbers > 1 && (
        <LocalPagination
          totalPages={pageNumbers}
          activePage={currentPage}
          setActivePage={setCurrentPage}
        />
      )}
    </div>
  )
}
export default Tabs
