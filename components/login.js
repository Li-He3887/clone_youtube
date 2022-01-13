import {useState, useEffect, useRef} from 'react';
import {useMutation} from '@apollo/client';
import {LOGIN} from '../apollo/mutation/login';

const clientId = "9103764666-2bkf8s7mjntcrmnka1h757t0c864i1c6.apps.googleusercontent.com"

function Login() {
    const [gsiLoaded, setGsiLoaded] = useState(false)
    const [user, setUser] = useState()
    const btnDivRef = useRef()

    const [login,{data}] = useMutation(LOGIN)
    
    const onSignOut = _=> {
        window.google?.accounts?.id?.disableAutoSelect(user.sub, (done, err) => {
          console.log(done, err)
        })
      }
    useEffect(() => {
        console.log('data:',data);
    }, [data])


    useEffect(() => {
        const handelGoogleletSignIn = async res => {
            login({
                variables: {token: res.credential}
            })
            // console.log(res.credential)
        }

        const initializeGsi= _=> {
            if(!window.google || gsiLoaded) return
            setGsiLoaded(true)
      
            window.google.accounts.id.initialize({
              client_id: clientId,
              callback: handelGoogleletSignIn, 
            })
            
            window.google.accounts.id.renderButton(
              btnDivRef.current,
              { theme: "outline", size: "large"}
            )
        }
            
        const script = document.createElement('script')
        script.src = "http://accounts.google.com/gsi/client"
        script.onload = initializeGsi
        script.async = true;
        script.id = "google-script"
        document.querySelector('head')?.appendChild(script)

        return () => {
            document.getElementById('google-script')?.remove()
            window.google?.accounts.id.cancel();
        }
    }, [gsiLoaded])

    return(
        <div>
            {!user ? (
                <div id="buttonDiv" ref={btnDivRef}></div>
                ) : (
                <>
                <p>
                    <img src={user.picture} alt="" />
                    {user.name}
                </p>
                </>
            )} 
        </div>
    )
}

export default Login