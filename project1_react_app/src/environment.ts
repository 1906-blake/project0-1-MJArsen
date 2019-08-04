
const dev = {
    context: 'http://localhost:8012'
}

const prod = {
    context: ''
}
export let environment = dev;

if (process.env.NODE_ENV === 'production') {
     environment = prod;
}