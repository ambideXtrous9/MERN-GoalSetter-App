1. npx create-react-app mernapp

-------------------------------------------------------------------------

1. go inside mernapp - 'npm start' in terminal 
2. delete logo.svg file and remove code-snippet in src/App.js inside return
    
    import './App.css';
    import Home from './screens/Home';

    function App() {
    return (
        <>
        <div className='fs-1'> {/* font for bootstarp */}
            <Home></Home>
        </div>
        </>
        
    );
    }

    export default App;

3. search npm bootstrap dark mode 
    a. https://github.com/vinorodrigues/bootstrap-dark-5/blob/main/docs/bootstrap-dark-plugin.md
    b. <link href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-dark-plugin.min.css" rel="stylesheet">

add this link inside - public/index.html paste above title 

make application in dark mode 

-----------------------------------------------------------------------------

1. now create components folder inside src and create file Navbar.js or .jsx - reuseable - so can be declared 
    as components

2. to reflect or render some changes in other file, that must be included in App.js

3. in return we can return only one <div></div>, so we need to cover/wrap it by empty <></>

4. import Navbar from './components/Navbar';
   and inside div - <Navbar/> we have to close it 

5. next we add another folder src/screen - Homepage, Login, Signup 

6. now add next components - Footer.js [add rfce]

7. now add this to Home.js - <div><Footer/></div>

8. go to - https://getbootstrap.com/docs/5.0/components/navbar/
    and copy the suitable navbar code and paste it in Navbar.js inside <div></div>
    (it may not work same as shown initially, as we are using dark mode)
    now change all 'class' -> 'className' (ctrl+shift+L)
                    '#' -> '/' (ctrl+shift+L)

    Now page is getting reloaded every time I click in options in Navbar(multipage app)
    So, to avoid this -> we use react routers 


------------------------------------------------------------------------------------------

1. href -> send us to a new page. we need to change this now with the help of React 
    router dom. 
2. install react router-dom : ~/MERN/FoodDeliveryApp/mernapp$ npm i react-router-dom
    "react-router-dom": "^6.9.0" -> should appear in package.json

3. go to : https://reactrouter.com/en/6.9.0/start/overview [React Router Dom]

    we need to replace -> anchor <a></a> with <Link to=" "></Link> in Navbar.js
    helps to prevent from reload + routes : to achieve single page application.

4. Add this snippet to App.js 
    import {
        BrowserRouter as Router,
        RouterProvider,
        Routes,
        Route,
        Link,
    } from "react-router-dom";

    and make 

    function App() {
        return (
            <Router>
                <div>
                    <Routes>
                        
                        # Here we will define our routes

                    </Routes>
                </div>
            </Router>    
        );
    }

    add routes : <Route exact path='/' element = {<Home/>} />
    exact path :  path like '/' 
    element : and which element we want display in that path 



5. ** and wherever anchor tag is used, we will use Link there **
    
    import {Link} from 'react-router-dom' and replace 'a' with Link
    replace 'href' -> 'to'

    Now, reloading is stopped

6. like Home.jsx create Login.jsx inside screens and add it to App.js
    <Route exact path='/login' element = {<Login/>} />

7. Now we design the Navbar.js :

    a. go to Navbar.js -> remove <li > of disabled and pricing in place of features add Login : 
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
    b. <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        changed name to 'GoFood'
        added font style as well
    
    c. now go to index.css and add a font family : 
        font-family : 'NHaasGroteskDSPro-65Md';  

        index.css has effect on whole application

    d. In index.html add this above title :
            <link href="//db.onlinewebfonts.com/c/c891e94039740e4a24a9f53324fd91be?family=NeueHaasGroteskDisp+Pro+Md" rel="stylesheet" type="text/css"/>    <title>React App</title>

8. Now design the body :

    a. add Card from bootstrap site and copy the suitable card code:
        class -> className,
        <div class="card" style="width: 18rem;"> -> <div className="card mt-3" style={{"width": "18rem"}}> : style should added inside {{}} and with key-value pair

        mt-3 : margin on top by 3
        m-2 : mrgin in all side by 2
    
    b. we can add other containers inside CardBody :

        <div className='container'></div> : container -> mobile first approach

        <select className='m-2 h-100 w-100 bg-success'>
                {}
        </select>

        this adds select list (dropdown) in frontend and 
        ** anything we write inside {} will be considered as JavaScript 

