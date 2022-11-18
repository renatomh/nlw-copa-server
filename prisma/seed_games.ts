/* Script to populate database games */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Defining the games data
const games = [
  {
    date: "2022-11-20T16:00:00.930Z",
    firstTeamCountryCode: "QA",
    secondTeamCountryCode: "EC"
  },
  {
    date: "2022-11-21T13:00:00.930Z",
    firstTeamCountryCode: "GB",
    secondTeamCountryCode: "IR"
  },
  {
    date: "2022-11-21T16:00:00.930Z",
    firstTeamCountryCode: "SN",
    secondTeamCountryCode: "NL"
  },
  {
    date: "2022-11-21T19:00:00.930Z",
    firstTeamCountryCode: "US",
    secondTeamCountryCode: "gb-wls" // Check Wales
  },
  {
    date: "2022-11-22T10:00:00.930Z",
    firstTeamCountryCode: "AR",
    secondTeamCountryCode: "SA"
  },
  {
    date: "2022-11-22T13:00:00.930Z",
    firstTeamCountryCode: "DK",
    secondTeamCountryCode: "TN"
  },
  {
    date: "2022-11-22T16:00:00.930Z",
    firstTeamCountryCode: "MX",
    secondTeamCountryCode: "PL"
  },
  {
    date: "2022-11-22T19:00:00.930Z",
    firstTeamCountryCode: "FR",
    secondTeamCountryCode: "AU"
  },
  {
    date: "2022-11-23T10:00:00.930Z",
    firstTeamCountryCode: "MA",
    secondTeamCountryCode: "HR"
  },
  {
    date: "2022-11-23T13:00:00.930Z",
    firstTeamCountryCode: "DE",
    secondTeamCountryCode: "JP"
  },
  {
    date: "2022-11-23T16:00:00.930Z",
    firstTeamCountryCode: "ES",
    secondTeamCountryCode: "CR"
  },
  {
    date: "2022-11-23T19:00:00.930Z",
    firstTeamCountryCode: "BE",
    secondTeamCountryCode: "CA"
  },
  {
    date: "2022-11-24T10:00:00.930Z",
    firstTeamCountryCode: "CH",
    secondTeamCountryCode: "CM"
  },
  {
    date: "2022-11-24T13:00:00.930Z",
    firstTeamCountryCode: "UY",
    secondTeamCountryCode: "KR"
  },
  {
    date: "2022-11-24T16:00:00.930Z",
    firstTeamCountryCode: "PT",
    secondTeamCountryCode: "GH"
  },
  {
    date: "2022-11-24T19:00:00.930Z",
    firstTeamCountryCode: "BR",
    secondTeamCountryCode: "RS"
  },
  {
    date: "2022-11-25T10:00:00.930Z",
    firstTeamCountryCode: "gb-wls",
    secondTeamCountryCode: "IR"
  },
  {
    date: "2022-11-25T13:00:00.930Z",
    firstTeamCountryCode: "QA",
    secondTeamCountryCode: "SN"
  },
  {
    date: "2022-11-25T16:00:00.930Z",
    firstTeamCountryCode: "NL",
    secondTeamCountryCode: "EC"
  },
  {
    date: "2022-11-25T19:00:00.930Z",
    firstTeamCountryCode: "GB",
    secondTeamCountryCode: "US"
  },
  {
    date: "2022-11-26T10:00:00.930Z",
    firstTeamCountryCode: "TN",
    secondTeamCountryCode: "AU"
  },
  {
    date: "2022-11-26T13:00:00.930Z",
    firstTeamCountryCode: "PL",
    secondTeamCountryCode: "SA"
  },
  {
    date: "2022-11-26T16:00:00.930Z",
    firstTeamCountryCode: "FR",
    secondTeamCountryCode: "DK"
  },
  {
    date: "2022-11-26T19:00:00.930Z",
    firstTeamCountryCode: "AR",
    secondTeamCountryCode: "MX"
  },
  {
    date: "2022-11-27T10:00:00.930Z",
    firstTeamCountryCode: "JP",
    secondTeamCountryCode: "CR"
  },
  {
    date: "2022-11-27T13:00:00.930Z",
    firstTeamCountryCode: "BE",
    secondTeamCountryCode: "MA"
  },
  {
    date: "2022-11-27T16:00:00.930Z",
    firstTeamCountryCode: "HR",
    secondTeamCountryCode: "CA"
  },
  {
    date: "2022-11-27T19:00:00.930Z",
    firstTeamCountryCode: "ES",
    secondTeamCountryCode: "CH"
  },
  {
    date: "2022-11-28T10:00:00.930Z",
    firstTeamCountryCode: "CM",
    secondTeamCountryCode: "RS"
  },
  {
    date: "2022-11-28T13:00:00.930Z",
    firstTeamCountryCode: "KR",
    secondTeamCountryCode: "GH"
  },
  {
    date: "2022-11-28T16:00:00.930Z",
    firstTeamCountryCode: "BR",
    secondTeamCountryCode: "CH"
  },
  {
    date: "2022-11-28T19:00:00.930Z",
    firstTeamCountryCode: "PT",
    secondTeamCountryCode: "UY"
  },
  {
    date: "2022-11-29T15:00:00.930Z",
    firstTeamCountryCode: "EC",
    secondTeamCountryCode: "SN"
  },
  {
    date: "2022-11-29T15:00:00.930Z",
    firstTeamCountryCode: "NL",
    secondTeamCountryCode: "QA"
  },
  {
    date: "2022-11-29T19:00:00.930Z",
    firstTeamCountryCode: "gb-wls",
    secondTeamCountryCode: "GB"
  },
  {
    date: "2022-11-29T19:00:00.930Z",
    firstTeamCountryCode: "IR",
    secondTeamCountryCode: "US"
  },
  {
    date: "2022-11-30T15:00:00.930Z",
    firstTeamCountryCode: "AU",
    secondTeamCountryCode: "DK"
  },
  {
    date: "2022-11-30T15:00:00.930Z",
    firstTeamCountryCode: "TN",
    secondTeamCountryCode: "FR"
  },
  {
    date: "2022-11-30T19:00:00.930Z",
    firstTeamCountryCode: "PL",
    secondTeamCountryCode: "AR"
  },
  {
    date: "2022-11-30T19:00:00.930Z",
    firstTeamCountryCode: "SA",
    secondTeamCountryCode: "MX"
  },
  {
    date: "2022-12-01T15:00:00.930Z",
    firstTeamCountryCode: "HR",
    secondTeamCountryCode: "BE"
  },
  {
    date: "2022-12-01T15:00:00.930Z",
    firstTeamCountryCode: "CA",
    secondTeamCountryCode: "MA"
  },
  {
    date: "2022-12-01T19:00:00.930Z",
    firstTeamCountryCode: "JP",
    secondTeamCountryCode: "ES"
  },
  {
    date: "2022-12-01T19:00:00.930Z",
    firstTeamCountryCode: "CR",
    secondTeamCountryCode: "DE"
  },
  {
    date: "2022-12-02T15:00:00.930Z",
    firstTeamCountryCode: "GH",
    secondTeamCountryCode: "UY"
  },
  {
    date: "2022-12-02T15:00:00.930Z",
    firstTeamCountryCode: "KR",
    secondTeamCountryCode: "PT"
  },
  {
    date: "2022-12-02T19:00:00.930Z",
    firstTeamCountryCode: "RS",
    secondTeamCountryCode: "CH"
  },
  {
    date: "2022-12-02T19:00:00.930Z",
    firstTeamCountryCode: "CM",
    secondTeamCountryCode: "BR"
  }
]

// Function to create all games in the list
async function main (){
  games.map(async (game) => {
    try {
      await prisma.game.create({
        data: game
      })
    } catch(error){
      console.log(error)
    }
  });
}

main();
