package com.bankpayment;

public class MBBankPayment extends BankAccountPayment {

    // Constructor
    public MBBankPayment(String accountNumber, double balance) {
        super("MBB", "MBBank", accountNumber, balance);
    }

    // Override fee calculation
    @Override
    public double calculateFee(double amount) {
        return amount * 0.002;
    }
}
