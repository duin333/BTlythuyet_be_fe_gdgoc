
package com.bankpayment;

public abstract class BankAccountPayment {

    // 1. Attributes
    protected String bankCode;
    protected String bankName;
    protected String accountNumber;
    protected double balance;

    // 2. Constructor
    public BankAccountPayment(
            String bankCode,
            String bankName,
            String accountNumber,
            double balance) {

        this.bankCode = bankCode;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // 3. Getters
    public String getBankCode() {
        return bankCode;
    }

    public String getBankName() {
        return bankName;
    }

    public double getBalance() {
        return balance;
    }

    // 4. Abstract method: Each bank has its own fee rule
    public abstract double calculateFee(double amount);

    // 5. Payment processing
    public boolean pay(double amount) {

        if (amount <= 0) {
            System.out.println("So tien thanh toan khong hop le!");
            return false;
        }

        double fee = calculateFee(amount);
        double totalAmount = amount + fee;

        if (balance >= totalAmount) {

            balance -= totalAmount;

            System.out.println("\n========== HOA DON THANH TOAN ==========");
            System.out.println("Ngan hang: " + bankName);
            System.out.println("Ma ngan hang: " + bankCode);
            System.out.println("So tai khoan: " + accountNumber);
            System.out.printf("So tien thanh toan: %,.0f VND%n", amount);
            System.out.printf("Phi giao dich: %,.0f VND%n", fee);
            System.out.printf("Tong tien: %,.0f VND%n", totalAmount);
            System.out.printf("So du con lai: %,.0f VND%n", balance);
            System.out.println("Trang thai: THANH CONG");
            System.out.println("========================================");

            return true;

        } else {

            System.out.println("\nGiao dich that bai!");
            System.out.println("So du khong du de thanh toan.");

            return false;
        }
    }
}
