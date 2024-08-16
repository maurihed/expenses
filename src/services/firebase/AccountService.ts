import db, { converter } from "@/firebase";
import { Account } from "@/types";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

export class AccountService {
  
  public static async addAccount(account: Account): Promise<Account> {
    try {
      const accountCollectionRef = collection(db, "accounts");
      const docRef = await addDoc(accountCollectionRef, { name: account.name, balance: account.balance });
      const { id: addedId } = await this.getAccountRefById(docRef.id);
      return Promise.resolve({ ...account, id: addedId });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public static async getAccounts(): Promise<Account[]> {
    try {
      const accountCollectionRef = collection(db, "accounts").withConverter(converter<Account>());
      if (!accountCollectionRef) throw new Error("Collection reference not initialized");
      const data = await getDocs(accountCollectionRef);
      return data.docs.map((doc) => doc.data()) as Account[];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private static async getAccountRefById(id: string): Promise<Account> {
    try {
      const accountCollectionRef = collection(db, "accounts").withConverter(converter<Account>());
      const docRef = doc(accountCollectionRef, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Account not found");
      }
      return docSnap.data() as Account;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateAccountBalance({ accountId, newBalance }: {accountId: string, newBalance: number}): Promise<Account> {
    try {
      const accountCollectionRef = collection(db, "accounts").withConverter(converter<Account>());
      const accountRef = doc(accountCollectionRef, accountId);
      const accountSnap = await getDoc(accountRef);
      if (!accountSnap.exists()) {
        throw new Error("Account not found");
      }

      const balanceAdjusted = accountSnap.data().balance + newBalance;
      await updateDoc(accountRef, { balance: balanceAdjusted });
      return Promise.resolve({ ...accountSnap.data(), balance: balanceAdjusted });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}


// 1500
