import axios from "axios";
export default async function generate(req,res)
{
        const encodedParams = new URLSearchParams();
        encodedParams.set('url', req.body.url);

        const options = {
        method: 'POST',
        url: 'https://url-shortener-service.p.rapidapi.com/shorten',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '8b7f97bfbbmsh19a5cf384fa0dadp1ed036jsn89877b641d88',
            'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
        },
        data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            res.json(
                {
                    error:false,
                    url:response.data
                }
            )
        } catch (error) {
            console.error(error);
            res.json(
                {
                    error:true,
                    message:error.message
                }
            )
        }
}