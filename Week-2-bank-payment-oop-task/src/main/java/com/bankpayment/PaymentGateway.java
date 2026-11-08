
package com.bankpayment;

import java.util.ArrayList;
import java.util.List;

public class PaymentGateway {

    // Danh sách lưu các phương thức thanh toán
    private List<BankAccountPayment> paymentMethods;

    // Constructor
    public PaymentGateway() {
        paymentMethods = new ArrayList<>();
    }

    // Thêm ngân hàng vào danh sách
    public void addPaymentMethod(BankAccountPayment method) {
        paymentMethods.add(method);
    }

    // Hiển thị danh sách ngân hàng
    public void displaySupportedBanks() {
        System.out.println("\n===== SUPPORTED BANKS =====");

        for (int i = 0; i < paymentMethods.size(); i++) {
            BankAccountPayment bank = paymentMethods.get(i);

            System.out.println(
                (i + 1) + ". " +
                bank.getBankName() +
                " (" + bank.getBankCode() + ")"
            );
        }

        System.out.println("===========================\n");
    }

    // Chọn ngân hàng theo số thứ tự
    public BankAccountPayment selectBank(int index) {

        if (index < 1 || index > paymentMethods.size()) {
            return null;
        }

        return paymentMethods.get(index - 1);
    }
}