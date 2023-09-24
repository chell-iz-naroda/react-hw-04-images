import { Header, SeachbarForm, FormSubmit, FormInput, FormText } from "./Searchbar.styled";

export const Searchbar = ({ onSubmit }) => {

    return (
        <>
            <Header>
                <SeachbarForm onSubmit={onSubmit}>
                    <FormSubmit type="submit">
                        <FormText>Search</FormText>
                    </FormSubmit>

                    <FormInput
                        name='query'
                        type="text"
                        placeholder="Search images and photos"
                    />
                </SeachbarForm>
            </Header>
        </>
    );
}