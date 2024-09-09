import styled from "styled-components";

export const SideBarContainer = styled.aside`
    background-color: #fff;
    box-shadow: -7px 0 15px rgba(0, 0, 0, 0.7);
    width: 300px;

    @media (max-width: 768px) {
        width: unset;
    }
`;
