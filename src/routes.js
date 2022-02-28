import landing from './components/HelloWorld';
import nextpage from './components/nextpage';
// import CreateFund from './components/CreateFund';

export default [
    {path: "/", component: landing},
    {path: "/next", component: nextpage},
    { path: '/code=:id', component: landing }
]