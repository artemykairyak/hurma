import s from "./ProfilePage.module.scss";
import TgIcon from "@assets/icons/tg.svg";
import { ContentLayout } from "@components/layouts/ContentLayout/ContentLayout";
import { GrayPanel } from "@components/shared/GrayPanel/GrayPanel";
import { InputWithButton } from "@components/shared/InputWithButton/InputWithButton";
import { Label } from "@components/shared/Label/Label";
import { Switch } from "@components/shared/Switch/Switch";
import { useHandleError } from "@hooks/useHandleError";
import { ProfileProps } from "@pages/profile";
import {
  subscribe,
  unsubscribe,
} from "@services/apiService/endpoints/profileApi";
import { FC, useEffect, useState } from "react";

export const ProfilePage: FC<ProfileProps> = ({ profile }) => {
  const handleError = useHandleError();
  const [isSubscribed, setIsSubscribed] = useState(profile.subscription);
  const [errors, setErrors] = useState("");

  const onTelegramCodeConfirm = ({
    telegramCode,
  }: {
    telegramCode: string;
  }) => {
    console.log(telegramCode);
  };

  const handleSubscription = async (value: boolean) => {
    if (value) {
      const [_, error] = await subscribe();

      if (error) {
        setErrors(handleError(error));
      }
    } else {
      const [_, error] = await unsubscribe();

      if (error) {
        setErrors(handleError(error));
      }
    }
  };

  useEffect(() => {
    handleSubscription(isSubscribed);
  }, [isSubscribed]);

  return (
    <ContentLayout loading={false}>
      <GrayPanel title="Profile">
        <div>
          <h2 className={s.email}>{profile.email}</h2>
          <div className={s.subscribe}>
            <Label label="email for daily updates" />
            <Switch
              checked={isSubscribed}
              onChange={setIsSubscribed}
              name="isSubscribed"
            />
          </div>
          <InputWithButton
            inputProps={{
              label:
                'code from <a href="https://t.me/kek" target="_blank">telegram bot</a>',
              name: "telegramCode",
            }}
            buttonProps={{ icon: TgIcon }}
            onSubmit={onTelegramCodeConfirm}
          />
        </div>
      </GrayPanel>
    </ContentLayout>
  );
};
