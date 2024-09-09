import styled from "styled-components";

export const HeaderContainer = styled.header`
    background-color: #fff;
    color: #fff;
    padding: 1rem;
    box-shadow: 0 -7px 15px rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const UlOptions = styled.ul`
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const LiOption = styled.li`
    display: inline;
`;

export const LinkOption = styled.a`
    color: #333;
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: inline-block;
    transition: background-color 0.3s;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: #f9f9f9;
    }
`;
