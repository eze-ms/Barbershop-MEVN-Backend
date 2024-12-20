import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                wrapper: 'space-y-2 mb-3',
                message: 'w-1/2 bg-red-500 text-white text-center rounded text-sm font-bold uppercase p-2 my-5 mx-auto block',
                
                input: 'w-3/4 bg-slate-100 p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 mx-auto block'
            },
            submit: {
              input: '$reset font-roboto text-lg bg-primary hover:bg-slate-600 rounded-lg text-white font-bold p-3 mt-10 w-1/4 mx-auto block'

            }
        })
    }
}

export default config