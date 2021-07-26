import {
    Container,
    H3
} from './style'
import {useLoarding} from '../../util/contexts/index';

export const Loarding = () => {
    const {loardingShow} = useLoarding();

    return (
        <Container showOn={loardingShow}>
            <img src={`/./assets/loading.gif`} />
            <H3>Aguarde...</H3>
        </Container>
    )
}