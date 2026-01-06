import Uzbekistan from "@react-map/uzbekistan";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Region() {
  return (
     <section className="relative mt-35 flex justify-between px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
     <Uzbekistan onSelect={toast} size={1100} hoverColor="orange" type='select-single' mapColor="#c9cbd0" selectColor="green" hints="true"/>
     <div className="grid grid-cols-2 gap-5 h-min">
      <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl" >
        <h4 className="stat-value text-xl mb-2">Andijon viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
      <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl" >
        <h4 className="stat-value text-xl mb-2">Buxoro viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
      <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl" >
        <h4 className="stat-value text-xl mb-2">Jizzax viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
      <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl" >
        <h4 className="stat-value text-xl mb-2">Qashqadaryo viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Navoiy viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Namangan viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Samarqand viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Surxondaryo viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Sirdaryo viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Toshkent shahri</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Toshkent viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Farg‘ona viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Xorazm viloyati</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
       <Link className="card rounded-md bg-base-300 p-4 hover:shadow-xl">
        <h4 className="stat-value text-xl mb-2">Qoraqalpog‘iston Respublikasi</h4>
        <p className="stat-desc">Ta'lim tashkilotlari soni <span className="text-primary font-bold text-md">56</span></p>
      </Link>
     </div>
    </section>
  )
}

export default Region