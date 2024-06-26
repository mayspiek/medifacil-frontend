import { PrimaryLayout } from '../../components/layout/primary-layout/primary-layout'
import { HomeContainer, HomeMain } from './home.style.ts'
import { SearchInput } from '../../components/Input/search-input.jsx'
import { CardPaciente } from '../../components/card-paciente/card-paciente.jsx'
import { Button } from '../../components/button/button.jsx'
import { SearchContainer } from '../../components/card-paciente/card-paciente.style.ts'
import { useFetchUsers } from '../../hooks/useFetchUsers.js'
import moment from 'moment';
import { useNavigate, useSearchParams } from 'react-router-dom'


export const Home = () => {
    const { users } = useFetchUsers('api/user/');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search' || '');
    
    let filteredUsers;

    if (search) {
        filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
    } else {
        filteredUsers = users;
    }

    return (
        <PrimaryLayout>
            <HomeContainer>
                <SearchContainer>
                    <SearchInput />
                    <a onClick={() => navigate('/cadastro-paciente')}>
                        <Button
                            text={'Cadastrar Paciente'}
                            width={'100%'} />
                    </a>
                </SearchContainer>
                <HomeMain>
                    {filteredUsers.map((user) => {
                        return (
                            <CardPaciente
                                name={user.name ? user.name : 'Nome não informado'}
                                birthDate={moment(user.birthDate).format('DD/MM/YYYY')}
                                cpf={user.cpf}
                                key={user.id}>
                            </CardPaciente>
                        )
                    })}
                </HomeMain>

            </HomeContainer>
        </PrimaryLayout>
    )
}
