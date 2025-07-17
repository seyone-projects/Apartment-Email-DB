
export const sendInvoice = async (req, res, next) => {
    try {
        const tableColumn = [
            { label: "Item", status: true },
            { label: "Description", status: true },
            { label: "Quantity", status: true },
            { label: "Price", status: true }
        ];
        const rows = [
            ["Item 1", "Description 1", "1", "$10"],
            ["Item 2", "Description 2", "2", "$20"]
        ];

        const pdfFilePath = await generatePDF(tableColumn, rows);

        // Send email with PDF attachment
        await sendEMail(
            "Test Invoice",
            "suresh@gmail.com",
            "<b>Demo text</b>",
            [{ filename: 'invoice.pdf', path: pdfFilePath }]
        );

        res.send({ status: true, message: 'Invoice PDF generated and sent via email' });
    } catch (err) {
        return handleErrors(err, res);
      }
};
