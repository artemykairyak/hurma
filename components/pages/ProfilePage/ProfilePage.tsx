import s from "./ProfilePage.module.scss";
import TgIcon from "@assets/icons/tg.svg";
import { ContentLayout } from "@components/layouts/ContentLayout/ContentLayout";
import { GrayPanel } from "@components/shared/GrayPanel/GrayPanel";
import { InputWithButton } from "@components/shared/InputWithButton/InputWithButton";
import { Label } from "@components/shared/Label/Label";
import { Switch } from "@components/shared/Switch/Switch";
import { useState } from "react";

export const ProfilePage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onTelegramCodeConfirm = ({
    telegramCode,
  }: {
    telegramCode: string;
  }) => {
    console.log(telegramCode);
  };

  return (
    <ContentLayout loading={false}>
      <GrayPanel title="Profile">
        <div>
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
