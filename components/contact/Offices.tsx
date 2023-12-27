const Offices: React.FC = () => {
  return (
    <div className="w-full md:pb-20 px-5 md:px-36 py-10 bg-white">
    <h1 className="text-violet-950 font-medium text-2xl md:text-lg mb-6 md:mb-4">Our office</h1>
      <div className="md:w-1/2 space-y-2">
        <h1 className="text-violet-950 font-medium text-lg md:text-md">Nigeria</h1>
        <div className="text-[#4F547B] md:text-sm space-y-2">
        <p>328 Queensberry Street, North Melbourne VIC 3051, Australia.</p>
        <p>+(1) 123 456 7890</p>
        <p>hi@educrat.com</p>
        
        </div>
      </div>
      
    </div>
  );
};

export default Offices;
