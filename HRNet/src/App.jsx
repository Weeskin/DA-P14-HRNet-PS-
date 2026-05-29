import WHLogo from './assets/wealth-health-logo.png'
import Select from './components/Select/Select'

const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
]

const DEPARTMENTS = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-[#2d7a3a] text-white px-6 py-4 flex items-center gap-4">
        <img src={WHLogo} alt="Wealth Health logo" className="h-10" />
        <h1 className="text-2xl font-medium">Wealth Health</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <a href="#" className="text-[#2d7a3a] hover:underline text-sm">
          View Current Employees
        </a>

        <h2 className="text-xl font-medium mt-6 mb-6 text-gray-800">Create Employee</h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d7a3a]" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="last-name">Last Name</label>
            <input id="last-name" type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d7a3a]" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="date-of-birth">Date of Birth</label>
            <input id="date-of-birth" type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d7a3a]" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="start-date">Start Date</label>
            <input id="start-date" type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d7a3a]" />
          </div>

          <fieldset className="border border-gray-300 rounded-md p-4 mt-2">
            <legend className="text-sm font-medium text-gray-700 px-2">Address</legend>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="street">Street</label>
                <input id="street" type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d7a3a]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="city">City</label>
                <input id="city" type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d7a3a]" />
              </div>
              <Select id="state" label="State" options={STATES} placeholder="-- Select State --" />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" type="number" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d7a3a]" />
              </div>
            </div>
          </fieldset>

          <Select id="department" label="Department" options={DEPARTMENTS} />

          <button
            type="button"
            className="mt-4 bg-[#2d7a3a] text-white font-medium py-2 px-6 rounded-md hover:bg-[#1f5a29] transition-colors self-start"
          >
            Save
          </button>
        </form>
      </main>
    </div>
  )
}
