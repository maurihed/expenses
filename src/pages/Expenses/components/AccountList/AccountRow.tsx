import { Button } from "@heroui/react";
import { Icon } from "@/componets";
import { Account } from "@/types";
import { formatMoney } from "@/utils";

type Props = {
  account: Account;
  newTransaction: (account: Account) => void;
};

function AccountRow({ account, newTransaction }: Props) {
  const { name, balance } = account;

  return (
    <div className="flex justify-between items-center">
      <span className="mr-4 shrink-0 bg-green-700 w-10 h-10 rounded-full flex justify-center items-center">
        <Icon prefix="fas" name="wallet" />
      </span>
      <div className="text-left grow">
        <div>{name}</div>
        <div className="text-slate-300">{formatMoney(balance)}</div>
      </div>
      <Button
        variant="solid"
        isIconOnly
        color="default"
        className="rounded-full"
        aria-label="New Transaction"
        onPress={() => newTransaction(account)}
      >
        <Icon prefix="fas" name="plus" />
      </Button>
    </div>
  );
}

export default AccountRow;
