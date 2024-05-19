import axios from 'axios'
import { AddressI } from '../Interface/interface'
export async  function extractLocation(longitude:number,latitude:number){
   try {
        console.log(longitude,latitude)
        const apiendpoint=`https://api.opencagedata.com/geocode/v1/json`
        const apikey=`4b33eba298244662a109b229d59355bb`
        const query=`${latitude},${longitude}`
        const url=`${apiendpoint}?key=${apikey}&q=${query}&pretty=1`
        const response=await axios.get(url)
        const data=response.data
        console.log(data.results)
    const result=data.results[0]
    const components=result.components
    const address:AddressI={
        region:components.county,
        state:components.state,
        postcode:parseInt(components.postcode),
        country:components.country
    }
    return address
   } catch (error) {
       return error
   }
}