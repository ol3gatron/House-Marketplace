import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebase.config"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from "swiper"
import 'swiper/swiper-bundle.css'
import Spinner from "./Spinner"


const Slider = () => {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListing = async () => {
      const listingRef = collection(db, "listings")
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchListing()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  return listings && (
    <>
      <p className="exploreHeading">Recommended</p>

      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{clickable: true}}
      >
        {listings.map(({data, id}) => (
          <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div className="swiperSlideDiv" style={{position: "relative"}}>
              <img src={data.imgUrls[0]} alt="" style={{width: "100%", height: 300}}/>
              {/* {data.location && (
                <span style={{position: "absolute", right: 0, bottom: 0, margin: 10}} className="discountPrice">{data.location.split(",")[0]}</span>
              )} */}
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / month"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default Slider