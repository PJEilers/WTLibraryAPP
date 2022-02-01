import { Button, ButtonFade } from '../../Styling/Button';

function Logout({ setPersoonInfo }) {

    const logout = () => {
        setPersoonInfo(null);
        localStorage.clear();
    }

    return (
        <ButtonFade>
            <Button buttonSize='btn--medium' onClick={() => logout()}>Log Out</Button>
        </ButtonFade>
    )
}

export default Logout;