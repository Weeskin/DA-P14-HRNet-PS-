// --- DONNÉES MOCK PERMANENTES POUR LES TESTS E2E (12 EMPLOYÉS VARIÉS). ---
// Dates en MM/DD/YYYY (format attendu par le DatePicker).
// Toutes les dates respectent la validation : âge 16–100 ans, startDate après DOB+16 ans.

export interface MockEmployee {
  firstName: string
  lastName: string
  dateOfBirth: string
  startDate: string
  street: string
  city: string
  state: string
  zipCode: string
  department: string
}

export const MOCK_EMPLOYEES: MockEmployee[] = [
  {
    firstName: "Alice", lastName: "Anderson",
    dateOfBirth: "01/15/1985", startDate: "03/01/2010",
    street: "12 Elm Street", city: "Birmingham",
    state: "Alabama", zipCode: "35201", department: "Sales",
  },
  {
    firstName: "Bob", lastName: "Brown",
    dateOfBirth: "05/20/1990", startDate: "06/15/2015",
    street: "5 Oak Avenue", city: "Anchorage",
    state: "Alaska", zipCode: "99501", department: "Engineering",
  },
  {
    firstName: "Charlie", lastName: "Carter",
    dateOfBirth: "11/30/1978", startDate: "01/10/2000",
    street: "88 Pine Road", city: "Phoenix",
    state: "Arizona", zipCode: "85001", department: "Human Resources",
  },
  {
    firstName: "Diana", lastName: "Davis",
    dateOfBirth: "07/04/1995", startDate: "08/20/2020",
    street: "3 Maple Lane", city: "Little Rock",
    state: "Arkansas", zipCode: "72201", department: "Legal",
  },
  {
    firstName: "Edward", lastName: "Evans",
    dateOfBirth: "03/22/1982", startDate: "04/01/2008",
    street: "47 Cedar Blvd", city: "Sacramento",
    state: "California", zipCode: "94203", department: "Marketing",
  },
  {
    firstName: "Fiona", lastName: "Foster",
    dateOfBirth: "09/10/1988", startDate: "10/05/2012",
    street: "9 Birch Way", city: "Denver",
    state: "Colorado", zipCode: "80201", department: "Sales",
  },
  {
    firstName: "George", lastName: "Green",
    dateOfBirth: "12/25/1975", startDate: "02/14/2000",
    street: "21 Walnut Drive", city: "Hartford",
    state: "Connecticut", zipCode: "06101", department: "Engineering",
  },
  {
    firstName: "Hannah", lastName: "Harris",
    dateOfBirth: "06/18/1992", startDate: "07/22/2017",
    street: "14 Spruce Court", city: "Wilmington",
    state: "Delaware", zipCode: "19801", department: "Legal",
  },
  {
    firstName: "Ivan", lastName: "Ingram",
    dateOfBirth: "04/05/1986", startDate: "05/30/2011",
    street: "66 Aspen Trail", city: "Tallahassee",
    state: "Florida", zipCode: "32301", department: "Human Resources",
  },
  {
    firstName: "Julia", lastName: "Johnson",
    dateOfBirth: "08/14/1993", startDate: "09/01/2018",
    street: "30 Magnolia Ave", city: "Atlanta",
    state: "Georgia", zipCode: "30301", department: "Marketing",
  },
  {
    firstName: "Kevin", lastName: "King",
    dateOfBirth: "02/28/1979", startDate: "03/15/2003",
    street: "55 Willow Street", city: "Boise",
    state: "Idaho", zipCode: "83701", department: "Sales",
  },
  {
    firstName: "Laura", lastName: "Lee",
    dateOfBirth: "10/07/1997", startDate: "11/20/2022",
    street: "77 Poplar Road", city: "Springfield",
    state: "Illinois", zipCode: "62701", department: "Engineering",
  },
]
