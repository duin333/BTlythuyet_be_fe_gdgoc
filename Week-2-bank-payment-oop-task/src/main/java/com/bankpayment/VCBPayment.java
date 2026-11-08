package com.bankpayment;

public class VCBPayment extends BankAccountPayment {

    // Constructor
    public VCBPayment(String accountNumber, double balance) {
        super("VCB", "Vietcombank", accountNumber, balance);
    }

    // Override fee calculation
    @Override
    public double calculateFee(double amount) {
        if (amount <= 0) {
            return 0.0;
        }
        return 1100.0;
    }
}
