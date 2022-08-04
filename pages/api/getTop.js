import { ZingMp3 } from "zingmp3-api-full/dist"

export default function(req,res){
    ZingMp3.getTop100().then((data) => {
        res.status(200).json({ data: data})
      })
}