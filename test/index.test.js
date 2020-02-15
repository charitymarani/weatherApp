const functions = require('../src/index');
const dotenv = require('dotenv');

dotenv.config()

describe("Get Weather", () => {

  it("should return correct geocordinates of a location", async (done) => {
    let url =`http://api.ipstack.com/${process.env.TEST_IP}?access_key=${process.env.IPSTACK_KEY}`
    const response = await functions.getLocation(url)
    expect(response.city).toBeDefined()
    done()
  })

  jest.spyOn(functions, "getWeather").mockResolvedValue({ formattedTime: "Thursday, November 21, 2019 2:01 PM", temperature: 78.47 })

  it("should return correct time and weather of a location ", async (done) => {
    const response = await functions.getWeather("https://api.darksky.net/forecast/7468111f859d0f664d2f48d4e3452a42/-1.2920659,36.8219462")
    expect(response.formattedTime).toBe("Thursday, November 21, 2019 2:01 PM")
    expect(response.temperature).toBe(78.47)
    done()
  })
})