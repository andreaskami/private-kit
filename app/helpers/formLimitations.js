import { GetStoreData, SetStoreData } from './General'
import { getTodaysTimestamp } from './dateUtils'

export const maxFormCount = 10
const waitTimeInMinutes = 30

export async function hasFormsLeft () {
  const formCount = await GetStoreData('FORMGENERAL_COUNT_' + getTodaysTimestamp())
  return formCount < maxFormCount
}

export async function getFormCount () {
  const formCount = await GetStoreData('FORMGENERAL_COUNT_' + getTodaysTimestamp())
  return formCount !== null ? formCount : 0
}

export async function increaseFormCount () {
  const formCount = await GetStoreData('FORMGENERAL_COUNT_' + getTodaysTimestamp())
  const newCount = formCount !== null ? Number(formCount) + 1 : 1
  await SetStoreData('FORMGENERAL_COUNT_' + getTodaysTimestamp(), newCount)
}

export async function getWaitTimeLeft () {
  const formActiveDate = await GetStoreData('FORMGENERAL', false).then(
    state => state && new Date(state.date)
  )
  if (formActiveDate === null) {
    return 0
  }

  const minutesPassed = (new Date() - formActiveDate) / 60000

  return Math.round(waitTimeInMinutes - minutesPassed)
}

export const invalidPostalCode = postalCode => {
  if (postalCode === undefined || postalCode === null) return false

  return [
    postalCode <= 0,
    postalCode > 9999,
    isNaN(postalCode),
    postalCode.toString().length !== 4
  ].some(Boolean)
}

export const invalidIdentification = identification => {
  if (identification === undefined || identification === null) return false

  const allowedCharacters = /^[0-9a-zA-Z]+$/

  return [!allowedCharacters.test(identification), identification.length > 10].some(Boolean)
}
