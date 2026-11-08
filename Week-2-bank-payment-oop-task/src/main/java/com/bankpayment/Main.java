
package com.bankpayment;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // 1. Nhap thong tin tai khoan
        System.out.println("===== BANK PAYMENT SYSTEM =====");

        System.out.print("Enter account number: ");
        String accountNumber = scanner.nextLine();

        // 2. Khoi tao PaymentGateway
        PaymentGateway gateway = new PaymentGateway();

        // 3. Them cac ngan hang vao he thong
        double initialBalance = 1000000.0;

        gateway.addPaymentMethod(
            new VCBPayment(accountNumber, initialBalance)
        );

        gateway.addPaymentMethod(
            new TCBPayment(accountNumber, initialBalance)
        );

        gateway.addPaymentMethod(
            new MBBankPayment(accountNumber, initialBalance)
        );

        // 4. Hien thi danh sach ngan hang
        gateway.displaySupportedBanks();

        // 5. Nguoi dung chon ngan hang
        System.out.print("Choose your bank (1-3): ");
        int choice = scanner.nextInt();

        BankAccountPayment selectedBank =
            gateway.selectBank(choice);

        if (selectedBank == null) {
            System.out.println("Invalid bank selection!");
            scanner.close();
            return;
        }

        // 6. Nhap so tien thanh toan
        System.out.print("Enter payment amount: ");
        double amount = scanner.nextDouble();

        // 7. Xu ly giao dich
        System.out.println("\n===== PAYMENT PROCESSING =====");

        selectedBank.pay(amount);

        scanner.close();
    }
}
