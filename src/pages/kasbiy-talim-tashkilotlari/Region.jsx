import Uzbekistan from "@react-map/uzbekistan";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGetFetch from "../../hooks/useGetFetch";
import { BiLogIn } from "react-icons/bi";

function Region() {
  const {
    data: regions,
    isPending,
    error,
  } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/region/`);

  const hududArr = [
    {name:"Qoraqalpog‘iston Respublikasi",id:3},
    {name:"Xorazm",id:14},
    {name:"Navoiy",id:12},
    {name:"Buxoro",id:18},
    {name:"Jizzax",id:9},
    {name:"Samarqand",id:8},
    {name:"Qashqadaryo",id:7},
    {name:"Surxondaryo",id:6},
    {name:"Sirdaryo",id:10},
    {name:"Toshkent",id:11},
    {name:"Toshkent City",id:1},
    {name:"Namangan",id:4},
    {name:"Farg‘ona",id:5},
    {name:"Andijon",id:17},]

const navigate = useNavigate()
  const handleMap = (value) => {
    const findElement = hududArr.find(hudud => hudud.name === value)
    navigate(`districts/${findElement.id}`)
  }

  return (
    <section className="flex flex-col mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      {isPending && <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>}
      {error && <div>{error}</div>}
      {
        regions && <>
          <h2 className="text-center text-2xl sm:text-4xl font-bold mb-5">
            Hududni tanlang
          </h2>
          <div className="flex gap-5 justify-between">
            <div className="w-[950px] 2xl:w-[900px] hidden xl:block">
              <Uzbekistan
                onSelect={handleMap}
                size="100%"
                hoverColor="orange"
                type="select-single"
                mapColor="#c9cbd0"
                selectColor="green"
                hints="true"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-2 gap-5 h-min">
              {
                regions.map((region)=>{
                  return(
                    <Link key={region.id} to={`districts/${region.id}`} className="card rounded-md bg-base-300 p-0 xl:p-4 hover:shadow-xl">
                <div className="mb-2 xl:hidden h-36">
                  <img
                    src={region.image}
                    alt=""
                    className="rounded-t-md w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 xl:p-0">
                  <h4 className="font-bold text-sm md:text-xl mb-2 text-center xl:text-start">
                    {region.name}
                  </h4>
                  <p className="stat-desc text-center xl:text-start">
                    Ta'lim tashkilotlari soni{" "}
                    <span className="text-primary font-bold text-md">56</span>
                  </p>
                </div>
              </Link>
                  )
                })
              }
            </div>
          </div>
        </>
      }
    </section>
  );
}

export default Region;
