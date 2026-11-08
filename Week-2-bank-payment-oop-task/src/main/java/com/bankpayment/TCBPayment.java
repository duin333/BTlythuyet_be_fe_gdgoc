package com.bankpayment;

public class TCBPayment extends BankAccountPayment {

    // Constructor
    public TCBPayment(String accountNumber, double balance) {
        super("TCB", "Techcombank", accountNumber, balance);
    }

    // Override fee calculation
    @Override
    public double calculateFee(double amount) {
        return 0.0;
    }
}
