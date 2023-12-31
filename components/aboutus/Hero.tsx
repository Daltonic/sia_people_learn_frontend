import Image from 'next/image'
import Button from '../reusableComponents/Button'

const Hero: React.FC = () => {
  return (
    <div>
      <div className="text-center w-full md:mb-16 p-5 bg-[#F9F9F9] h-56 md:h-96 flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
        <p className="text-md mt-3 capitalize w-full">
          We are on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col md:flex-row justify-between md:my-16 px-5 py-10 md:px-20">
          <div className="flex w-full md:w-[45%] items-start gap-5">
            <Image
              src="/images/courseCard/card1.svg"
              alt=""
              width={0}
              height={0}
              className="h-full object-cover w-1/2"
            />
            <div className="w-1/2 h-full flex flex-col gap-5">
              <Image
                className="h-full object-cover w-full"
                src="/images/courseCard/card2.svg"
                width={150}
                height={200}
                alt=""
              />
              <Image
                className="h-full object-cover w-full"
                src="/images/courseCard/card3.svg"
                width={150}
                height={200}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col md:px-5 md:w-[45%] mt-10 md:mt-0">
            <div className="text-violet-950 text-3xl font-bold leading-10">
              Welcome to Educrat Enhance your skills with best Online courses
            </div>
            <div className="text-violet-950 text-base mt-3">
              You can start and finish one of these popular courses in under a
              day - for free! Check out the list below.. Take the course for
              free
            </div>
            <div className="text-slate-600 text-base my-5">
              Neque convallis a cras semper auctor. Libero id faucibus nisl
              tincidunt egetnvallis a cras semper auctonvallis a cras semper
              aucto. Neque convallis a cras semper auctor. Liberoe convallis a
              cras semper atincidunt egetnval
            </div>
            <Button variant="pink" style={{ width: '16rem', padding: '10px' }}>
              Start Learning For Free{' '}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
