import { Steps, Button } from "antd";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentAtom, isLoadedAtom, resultAtom } from "../../atoms";
import Result from "./Result";
import StpesBtn from "./StepsAction";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
  padding: 0 48px;
  max-width: calc(1200px + 48px + 48px);
  margin: 0 auto;
`;

const BoxWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const StepWrapper = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const StepBox = styled.div`
  display: flex;
  width: 900px;
  height: 560px;
  background: #ffffff;
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-radius: 20px;
`;

const { Step } = Steps;

const StyledStep = styled(Steps)`
  display: flex;
  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
    background: #c365fd;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: #c365fd;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #fff;
    border-color: #c365fd;
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #c365fd;
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #c365fd;
  }
`;

function WineInfo() {
  const current = useRecoilValue(currentAtom);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedAtom);
  const result = useRecoilValue(resultAtom);
  const steps = [
    {
      title: "인트로",
      description: "인트로 페이지입니다.",
    },
    {
      title: "와인 종류 선택하기",
      description: "어떤 종류의 와인을 추천해드릴까요?",
    },
    {
      title: "맛 선택하기",
      description: "어떤 맛을 선호하시나요?",
    },
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>와인 추천 받아보기</title>
        </Helmet>
      </HelmetProvider>

      <MainContainer>
        {!isLoaded ? (
          <>
            <BoxWrapper>
              <StepBox>
                <StpesBtn />
              </StepBox>
            </BoxWrapper>
            <StepWrapper>
              <StyledStep direction="vertical" size="small" current={current}>
                {steps.map((item) => (
                  <Step
                    key={item.title}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </StyledStep>
            </StepWrapper>
          </>
        ) : (
          <div key={result.id} title={result.name}>
            {result.map((result) => (
              <Result
                key={result.id}
                wineId={result.id}
                title={result.name}
                type={result.type}
                nation={result.nation}
                local={result.local}
                price={result.price}
                abv={result.abv}
                varieties={result.varieties}
              />
            ))}
            <Button onClick={() => setIsLoaded(false)}>돌아가기</Button>
          </div>
        )}
      </MainContainer>
    </>
  );
}

export default WineInfo;
