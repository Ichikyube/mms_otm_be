import nodemailer from "nodemailer";
import handlebars from "handlebars";
import cron from "node-cron";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import __dirname from "../app/config/path.config.js";
const cronAsset = async () => {
  let emailTo = [];

  // const CertificateLogx = Parse.Object.extend("CertificateLog");
  // const certificateLogx = new CertificateLogx();

  // certificateLogx.set("message", "test");
  // certificateLogx.set("warning_date", new Date(new Date().toLocaleDateString()));

  // certificateLogx.save();

  const qCertificateLog = new Parse.Query("CertificateLog");
  qCertificateLog.equalTo(
    "warning_date",
    new Date(new Date().toLocaleDateString())
  );

  let certificateLogs = await qCertificateLog.find().catch((err) => {
    // console.error("");
    // console.error("Got an error in get certificates.");
    // console.error("Error Code: " + err.code + " : " + err.message);
    // console.error("Error Message: " + err.message);
    // return null;
  });

  if (certificateLogs && certificateLogs.length > 0) {
    return null;
  }

  const qCertificate = new Parse.Query("certificate");
  qCertificate.equalTo("is_deleted", false);
  // qCertificate.lessThan("expdatetime", new Date());
  // qEmployee.include("user");
  // qEmployee.equalTo("department", requester_department);

  let certificates = await qCertificate.find().catch((err) => {
    // console.error("");
    // console.error("Got an error in get certificates.");
    // console.error("Error Code: " + err.code + " : " + err.message);
    // console.error("Error Message: " + err.message);
    // return null;
  });

  // console.log(`Now is: ${(new Date()).toDateString()} ${(new Date()).toTimeString()}`);

  const listTobeExpiredCertificates = [];
  const listAlreadyExpiredCertificates = [];
  // const listExpiredCertificates = certificates.map((certificate) => `<li>Name: ${certificate.get("name")}, expired date: ${certificate.get("expdatetime").toDateString()} ${certificate.get("expdatetime").toTimeString()}.</li>`);
  // console.log(listExpiredCertificates);

  certificates &&
    certificates.forEach((item) => {
      let current = new Date();

      const certificate = item.toJSON();

      const name = certificate.name;
      const expdatetime = new Date(certificate.expdatetime.iso);
      let certificate_reminder = certificate.reminder || 30;
      const reminder = new Date(
        new Date().setDate(current.getDate() + certificate_reminder)
      );

      if (expdatetime && reminder && expdatetime < reminder) {
        // console.log("");
        // console.log(expdatetime);
        // console.log(reminder);

        if (expdatetime < current) {
          listAlreadyExpiredCertificates.push(
            `<li>Name: ${name}, Expired Date: ${expdatetime.toDateString()}.</li>`
          );
        } else {
          listTobeExpiredCertificates.push(
            `<li>Name: ${name}, Expired Date: ${expdatetime.toDateString()}.</li>`
          );
        }
      } else if (expdatetime && expdatetime < current) {
        listAlreadyExpiredCertificates.push(
          `<li>Name: ${name}, Expired Date: ${expdatetime.toDateString()}.</li>`
        );
      }
    });

  // HSSE Dept
  const qDeptHsse = new Parse.Query("departments");
  qDeptHsse.equalTo("name", "HSSE");
  let dept_hsse = await qDeptHsse.first();

  if (dept_hsse) {
    const qEmployee = new Parse.Query("employee");

    qEmployee.select("user.username");
    qEmployee.equalTo("department", dept_hsse);

    let employees = await qEmployee.find().catch((err) => {
      // console.error("");
      // console.error("Got an error in get employee in Dept HSSE.");
      // console.error("Error Code: " + err.code + " : " + err.message);
      // console.error("Error Message: " + err.message);
    });

    employees &&
      employees.forEach((item) => {
        let employee = item.toJSON();

        emailTo.push(employee.user.username);
      });
  }

  // Terminal Manager
  const qDeptTerminalManager = new Parse.Query("departments");
  qDeptTerminalManager.equalTo("name", "TERMINAL MANAGER");
  let dept_terminal_manager = await qDeptTerminalManager.first();

  if (dept_terminal_manager) {
    const qEmployee = new Parse.Query("employee");

    qEmployee.select("user.username");
    qEmployee.equalTo("department", dept_terminal_manager);

    let employees = await qEmployee.find().catch((err) => {
      // console.error("");
      // console.error("Got an error in get employee in Teminal Manager.");
      // console.error("Error Code: " + err.code + " : " + err.message);
      // console.error("Error Message: " + err.message);
    });

    employees &&
      employees.forEach((item) => {
        let employee = item.toJSON();

        emailTo.push(employee.user.username);
      });
  }

  // ME
  const qDeptME = new Parse.Query("departments");
  qDeptME.equalTo("name", "M&E DEPT");
  let dept_ME = await qDeptME.first();

  if (dept_ME) {
    const qEmployee = new Parse.Query("employee");

    qEmployee.select("user.username");
    qEmployee.equalTo("department", dept_ME);

    let employees = await qEmployee.find().catch((err) => {
      // console.error("");
      // console.error("Got an error in get employee in M&E DEPT.");
      // console.error("Error Code: " + err.code + " : " + err.message);
      // console.error("Error Message: " + err.message);
    });

    employees &&
      employees.forEach((item) => {
        let employee = item.toJSON();

        emailTo.push(employee.user.username);
      });
  }

  // IT DEPT
  const qDeptIT = new Parse.Query("departments");
  qDeptIT.equalTo("name", "IT DEPT");
  let dept_IT = await qDeptIT.first();

  if (dept_IT) {
    const qEmployee = new Parse.Query("employee");

    qEmployee.select("user.username");
    qEmployee.equalTo("department", dept_IT);

    let employees = await qEmployee.find().catch((err) => {
      // console.error("");
      // console.error("Got an error in get employee in M&E DEPT.");
      // console.error("Error Code: " + err.code + " : " + err.message);
      // console.error("Error Message: " + err.message);
    });

    employees &&
      employees.forEach((item) => {
        let employee = item.toJSON();

        emailTo.push(employee.user.username);
      });
  }

  // emailTo = [];

  emailTo.push("mromzy@gmail.com");

  let emailto_unique = [...new Set(emailTo)];
  const filePath = join(
    process.cwd(),
    "cloud",
    "templates",
    "alertCertificate.html"
  );
  readFile(filePath, "utf8").then((html) => {
    let template = handlebars.compile(html);

    let replacements = {
      listAlreadyCertificates: listAlreadyExpiredCertificates.join(""),
      listTobeCertificates: listTobeExpiredCertificates.join(""),
    };

    let htmlToSend = template(replacements);

    const CertificateLog = Parse.Object.extend("CertificateLog");
    const certificateLog = new CertificateLog();

    certificateLog.set("message", htmlToSend);
    certificateLog.set(
      "warning_date",
      new Date(new Date().toLocaleDateString())
    );

    certificateLog.save();

    //info@armin.co.id
    let mailOptions = {
      from: "ptotm.mms@otmerak.com",
      to: emailto_unique.join("; "),
      subject: `Warning Notification: Expired Certificates`,
      html: htmlToSend, // <= for html templated emails
    };

    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        const ErrorLog = Parse.Object.extend("errorlog");
        const errorlog = new ErrorLog();

        errorlog.set("error_message", "cannot send email");
        errorlog.set("error_object", JSON.stringify(error));

        errorlog.save();

        console.log(error);
      }
    });
  });
};
//0 1 * * *
cron.schedule("*/2 * * * *", () => {
  console.log("Running task");

  cronAsset();
});

// create reusable transporter object using the default SMTP transport

const transporter = nodemailer.createTransport({
  host: "mail.armin.co.id",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "info@armin.co.id", // generated ethereal user
    pass: "P@ssw0rd#1!", // generated ethereal password
  },
});
export const cloud = () => {
  Parse.Cloud.beforeSave("contact", async (request) => {
    let prefix = "";
    let availableNumber = 0;
    let emailTo = "mromzy@gmail.com; nabil.n.f.h@gmail.com;";

    let IDNumber = request.object.get("number");

    console.log("console log...");
    console.log("request:");
    console.log(IDNumber);

    if (!IDNumber || IDNumber === "") {
      const qMasterNumber = new Parse.Query("masternumber");

      const masterNumber2 = await qMasterNumber.get("7dTSFKSZ9x").then(
        (result) => {
          availableNumber = result.get("available");
          prefix = result.get("prefix");

          IDNumber = `${prefix}${availableNumber}`;
          console.log(`ID Number: ${prefix}${availableNumber}`);

          request.object.set("number", `${IDNumber}`);
          request.object.save();

          // result.set('available', availableNumber + 1);
          result.increment("available");
          // result.save();

          readFile(
            process.cwd() + "/cloud/templates/NewContactEmail.html",
            "utf8",
            (err, html) => {
              let template = handlebars.compile(html);

              let replacements = {
                contactID: contactNumber,
                firstname: "Muhammad",
                lastname: "Romzi",
              };

              let htmlToSend = template(replacements);

              let mailOptions = {
                from: "info@armin.co.id",
                to: emailTo,
                subject: "New Contact Notification",
                html: htmlToSend, // <= for html templated emails
              };

              transporter.sendMail(mailOptions, function (error, response) {
                if (error) {
                  console.log(error);
                  callback(error);
                }

                console.log("Message sent: %s", info.messageId);
              });
            }
          );

          return result;
        },
        (error) => {
          console.error("Got an error " + error.code + " : " + error.message);

          return null;
        }
      );
    }
  });

  Parse.Cloud.beforeSave("xticket", (request) => {
    let prefix = "";
    let availableNumber = 0;
    let emailTo = "mromzy@gmail.com; nabil.n.f.h@gmail.com;";

    let contactNumber = request.object.get("number");

    console.log("console log...");
    console.log("request:");
    console.log(contactNumber);

    var IDNumber = request.object.get("number");
    var woSubject = request.object.get("subject");
    var assignTo = request.object.get("assignto");

    console.log("loging....");
    console.log("request:");
    console.log(IDNumber);
    console.log(woSubject);
    // console.log(assignTo.get("firstname"));

    /*
      if(!IDNumber || IDNumber === ""){
          const queryMasterNumber = new Parse.Query("masternumber");
          
          queryMasterNumber.get("692dDylmBd", { useMasterKey: true })
          .then(function(masterNumber) {
              availableNumber = masterNumber.get("available");
              prefix = masterNumber.get("prefix");
              IDNumber= `${prefix}${availableNumber}`;
              
              console.log("available number:");
              console.log(availableNumber);
                  
              request.object.set("number", IDNumber);
              request.object.save();
                  
              // masterNumber.set('available', availableNumber + 1);
              masterNumber.increment("available");
              masterNumber.save();
                  
                  readFile(process.cwd() + "/cloud/templates/NewWoEmail.html', 'utf8', function(err, html)
                  {
                      let template = handlebars.compile(html);
                      
                      let replacements = {
                          IDNumber: IDNumber,
                          subject : woSubject,
                          assignto : assignTo,
                };
        
                let htmlToSend = template(replacements);
        
                let mailOptions = {
                    from: 'info@armin.co.id',
                    to: emailTo,
                    subject: "New Work Order Notification",
                    html: htmlToSend
                  };
              
                transporter.sendMail(mailOptions, function (error, response)
                {
                    if (error) {
                      console.log(error);
                    callback(error);
                  }
          
                  console.log('Message sent: %s', info.messageId);
                });
              });
          
                  return;
              }).catch(function(error) {
                  console.error("Got an error " + error.code + " : " + error.message);
              });
      }
      */
  });

  /*
  const transporter = nodemailer.createTransport({
      host: "mail.otmerak.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: "ptotm.mms@otmerak.com", // generated ethereal user
          pass: "password2021", // generated ethereal password
      },
  });
  */
  /*
  const transporter = nodemailer.createTransport({
      host: "lyanna.id.rapidplex.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: "ptotm.mms@otmerak.com", // generated ethereal user
          pass: "P@ssw0rd#1!", // generated ethereal password
      },
  });
  */

  Parse.Cloud.define("test", async (request) => {
    let result = null;

    result = {
      status: true,
      message: "This is cloud api working..",
      request: request,
    };

    console.log("result:");
    console.log(result);

    return result;
  });

  Parse.Cloud.define("generate_contact_number", async (request) => {
    let prefix = "";
    let availableNumber = 0;
    let emailTo = "mromzy@gmail.com; nabil.n.f.h@gmail.com; enal@otmerak.com;";

    let results = {
      status: false,
      data: {},
    };

    const qContact = new Parse.Query("contact");
    let objectId = request.params.objectId;
    let contact = await qContact.get(objectId).catch((err) => {
      results.error = err;
    });

    console.log("console log...");
    console.log("request:");
    console.log(request.params);

    if (!contact.number || contact.number === "" || true) {
      const qMasterNumber = new Parse.Query("masternumber");

      const masterNumber2 = await qMasterNumber.get("7dTSFKSZ9x").then(
        (mn) => {
          availableNumber = mn.get("available");
          prefix = mn.get("prefix");

          contact.set("number", `${prefix}${availableNumber}`);
          contact.save();
          results.data.contact = contact;

          console.log(`contact.number (1) : ${prefix}${availableNumber}`);
          console.log(`contact.number (2) : ${contact.get("number")}`);

          // mn.set('available', availableNumber + 1);
          mn.increment("available");
          mn.save();

          results.data.masterNumber = mn;

          /*
              readFile(process.cwd() + "/cloud/templates/NewContactEmail.html', 'utf8', (err, html) => 
              {
                  let template = handlebars.compile(html);
                      
                  let replacements = {
                      contactID: contactNumber,
                      firstname : "Muhammad",
                      lastname : "Romzi",
              };
      
              let htmlToSend = template(replacements);
      
              let mailOptions = {
                  from: 'info@armin.co.id',
                  to: emailTo,
                  subject: "New Contact Notification",
                  html: htmlToSend // <= for html templated emails
              };
          
              transporter.sendMail(mailOptions, function (error, response)
              {
                if (error) {
                  console.log(error);
              }
                  });
            });
              */
          return mn;
        },
        (err) => {
          results.error = err;
          console.error("Got an error " + err.code + " : " + err.message);

          return null;
        }
      );
    }

    return results;
  });

  Parse.Cloud.define("generate_wo_number", async (request) => {
    let prefix = "";
    let availableNumber = 0;
    let emailTo = [];

    let results = {
      status: false,
      message: "",
      data: {
        params: request.params,
      },
    };

    const qTicket = new Parse.Query("ticket");
    let objectId = request.params.objectId;

    qTicket.select(["number", "subject", "statusticket"]);
    qTicket.select([
      "requester.department",
      "requester.firstname",
      "requester.lastname",
      "requester.user.username",
    ]);
    qTicket.select([
      "assignto.department",
      "assignto.firstname",
      "assignto.lastname",
      "assignto.user.username",
    ]);
    qTicket.select([
      "createdby.firstname",
      "createdby.lastname",
      "createdby.user.username",
    ]);
    // qTicket.include(["requester.user", "assignto.user", "createdby.user"]);

    let ticket = await qTicket.get(objectId).catch((err) => {
      results.error_get_ticket = err;

      console.error("");
      console.error("Got an error in query ticket.");
      console.error("Error Code: " + err.code + " : " + err.message);
      console.error("Error Message: " + err.message);

      return results;
    });

    if (!ticket) {
      results.message += "Cannot get ticket, ticket null/empty. \n";

      return results;
    }

    results.data.wo_before = ticket.toJSON();

    if (ticket.get("number")) {
      results.message += "Ticket already created before. \n";

      return results;
    }

    // if(!ticket.get("number") || ticket.get("number") === ""))

    const qMasterNumber = new Parse.Query("masternumber");
    const masterNumber = await qMasterNumber
      .select(["prefix", "available"])
      .get("692dDylmBd")
      .catch((err) => {
        results.error_get_master_number = err;

        console.error("");
        console.error("Got an error in query MasterNumber");
        console.error("Error Code: " + err.code + " : " + err.message);
        console.error("Error Message: " + err.message);

        return results;
      });

    if (!masterNumber) {
      results.message += "Cannot get Master Number. \n";

      return results;
    }

    availableNumber = masterNumber.get("available");
    prefix = masterNumber.get("prefix");

    ticket.set("number", `${prefix}${availableNumber}`);
    ticket.save();

    // masterNumber.set('available', availableNumber + 1);
    masterNumber.increment("available");
    masterNumber.save();

    let wo = ticket.toJSON();
    results.data.wo_after = wo;

    try {
      wo.createdby.user.username && emailTo.push(wo.createdby.user.username);
    } catch (err) {
      results.message += "wo.createdby.user.username undefined. \n";
    }

    try {
      if (wo.requester.department) {
        const qEmployee = new Parse.Query("employee");

        qEmployee.select("user.username");
        qEmployee.equalTo("department", wo.requester.department);

        let employees = await qEmployee.find().catch((err) => {
          results.error_get_employee_in_dept_requester = err;

          console.error("");
          console.error("Got an error in get employee in dept requester.");
          console.error("Error Code: " + err.code + " : " + err.message);
          console.error("Error Message: " + err.message);

          return results;
        });

        employees &&
          employees.forEach((item) => {
            let employee = item.toJSON();

            emailTo.push(employee.user.username);
          });
      }
    } catch (err) {
      results.message += "wo.requester.department undefined. \n";
    }

    try {
      if (wo.assignto.department) {
        const qEmployee = new Parse.Query("employee");

        qEmployee.select("user.username");
        qEmployee.equalTo("department", wo.assignto.department);

        let employees = await qEmployee.find().catch((err) => {
          results.error_get_employee_in_dept_assignto = err;

          console.error("");
          console.error("Got an error in get employee in dept assignto.");
          console.error("Error Code: " + err.code + " : " + err.message);
          console.error("Error Message: " + err.message);

          return results;
        });

        employees &&
          employees.forEach((item) => {
            let employee = item.toJSON();

            emailTo.push(employee.user.username);
          });
      }
    } catch (err) {
      results.message += "wo.assignto.department undefined. \n";
    }

    // HSSE Dept
    const qDeptHsse = new Parse.Query("departments");
    qDeptHsse.equalTo("name", "HSSE");
    let dept_hsse = await qDeptHsse.first();

    if (dept_hsse) {
      const qEmployee = new Parse.Query("employee");

      qEmployee.select("user.username");
      qEmployee.equalTo("department", dept_hsse);

      let employees = await qEmployee.find().catch((err) => {
        results.error_get_employee_in_dept_hsse = err;

        console.error("");
        console.error("Got an error in get employee in Dept HSSE.");
        console.error("Error Code: " + err.code + " : " + err.message);
        console.error("Error Message: " + err.message);

        return results;
      });

      employees &&
        employees.forEach((item) => {
          let employee = item.toJSON();

          emailTo.push(employee.user.username);
        });
    }

    // Terminal Manager
    const qDeptTerminalManager = new Parse.Query("departments");
    qDeptTerminalManager.equalTo("name", "TERMINAL MANAGER");
    let dept_terminal_manager = await qDeptTerminalManager.first();

    if (dept_terminal_manager) {
      const qEmployee = new Parse.Query("employee");

      qEmployee.select("user.username");
      qEmployee.equalTo("department", dept_terminal_manager);

      let employees = await qEmployee.find().catch((err) => {
        results.error_get_employee_in_dept_terminal_manager = err;

        console.error("");
        console.error("Got an error in get employee in Teminal Manager.");
        console.error("Error Code: " + err.code + " : " + err.message);
        console.error("Error Message: " + err.message);

        return results;
      });

      employees &&
        employees.forEach((item) => {
          let employee = item.toJSON();

          emailTo.push(employee.user.username);
        });
    }

    emailTo.push("mromzy@gmail.com");

    let emailto_unique = [...new Set(emailTo)];

    readFile(
      process.cwd() + "/cloud/templates/NewWoEmail.html",
      "utf8",
      (err, html) => {
        let template = handlebars.compile(html);

        let replacements = {
          woNumber: wo.number,
          woSubject: wo.subject,
          woStatus: wo.statusticket,
          woRequester:
            wo.requester &&
            `${wo.requester.firstname} ${wo.requester.lastname} [${wo.requester.user.username}]`,
          woAssignTo:
            wo.assignto &&
            `${wo.assignto.firstname} ${wo.assignto.lastname} [${wo.assignto.user.username}]`,
          woCreateBy:
            wo.createdby &&
            `${wo.createdby.firstname} ${wo.createdby.lastname} [${wo.createdby.user.username}]`,
        };

        let htmlToSend = template(replacements);

        //"ptotm.mms@otmerak.com"
        let mailOptions = {
          from: "ptotm.mms@otmerak.com",
          to: emailto_unique.join("; "),
          subject: `New ${wo.number} : ${wo.statusticket}`,
          html: htmlToSend, // <= for html templated emails
        };

        transporter.sendMail(mailOptions, function (error, response) {
          if (err) {
            results.error_send_email = err;

            console.error("");
            console.error("Got an error in send email.");
            console.error("Error Code: " + err.code + " : " + err.message);
            console.error("Error Message: " + err.message);
          }
        });
      }
    );

    return results;
  });

  Parse.Cloud.define("update_wo", async (request) => {
    let emailTo = [];

    let results = {
      status: false,
      message: "",
      data: {
        params: request.params,
      },
    };

    const qTicket = new Parse.Query("ticket");
    let objectId = request.params.objectId;

    qTicket.select(["number", "subject", "statusticket"]);
    qTicket.select([
      "requester.department",
      "requester.firstname",
      "requester.lastname",
      "requester.user.username",
    ]);
    qTicket.select([
      "assignto.department",
      "assignto.firstname",
      "assignto.lastname",
      "assignto.user.username",
    ]);
    qTicket.select([
      "createdby.firstname",
      "createdby.lastname",
      "createdby.user.username",
    ]);
    // qTicket.include(["requester.user", "assignto.user", "createdby.user"]);

    let ticket = await qTicket.get(objectId).catch((err) => {
      results.error_get_ticket = err;

      console.error("");
      console.error("Got an error in query ticket.");
      console.error("Error Code: " + err.code + " : " + err.message);
      console.error("Error Message: " + err.message);

      return results;
    });

    if (!ticket) {
      results.message += "Cannot get ticket, ticket null/empty. \n";

      return results;
    }

    let wo = ticket.toJSON();
    results.data.wo = wo;

    try {
      wo.createdby.user.username && emailTo.push(wo.createdby.user.username);
    } catch (err) {
      results.message += "wo.createdby.user.username undefined. \n";
    }

    try {
      if (wo.requester.department) {
        const qEmployee = new Parse.Query("employee");

        qEmployee.select("user.username");
        qEmployee.equalTo("department", wo.requester.department);

        let employees = await qEmployee.find().catch((err) => {
          results.error_get_employee_in_dept_requester = err;

          console.error("");
          console.error("Got an error in get employee in dept requester.");
          console.error("Error Code: " + err.code + " : " + err.message);
          console.error("Error Message: " + err.message);

          return results;
        });

        employees &&
          employees.forEach((item) => {
            let employee = item.toJSON();

            emailTo.push(employee.user.username);
          });
      }
    } catch (err) {
      results.message += "wo.requester.department undefined. \n";
    }

    try {
      if (wo.assignto.department) {
        const qEmployee = new Parse.Query("employee");

        qEmployee.select("user.username");
        qEmployee.equalTo("department", wo.assignto.department);

        let employees = await qEmployee.find().catch((err) => {
          results.error_get_employee_in_dept_assignto = err;

          console.error("");
          console.error("Got an error in get employee in dept assignto.");
          console.error("Error Code: " + err.code + " : " + err.message);
          console.error("Error Message: " + err.message);

          return results;
        });

        employees &&
          employees.forEach((item) => {
            let employee = item.toJSON();

            emailTo.push(employee.user.username);
          });
      }
    } catch (err) {
      results.message += "wo.assignto.department undefined. \n";
    }

    // HSSE Dept
    const qDeptHsse = new Parse.Query("departments");
    qDeptHsse.equalTo("name", "HSSE");
    let dept_hsse = await qDeptHsse.first();

    if (dept_hsse) {
      const qEmployee = new Parse.Query("employee");

      qEmployee.select("user.username");
      qEmployee.equalTo("department", dept_hsse);

      let employees = await qEmployee.find().catch((err) => {
        results.error_get_employee_in_dept_hsse = err;

        console.error("");
        console.error("Got an error in get employee in Dept HSSE.");
        console.error("Error Code: " + err.code + " : " + err.message);
        console.error("Error Message: " + err.message);

        return results;
      });

      employees &&
        employees.forEach((item) => {
          let employee = item.toJSON();

          emailTo.push(employee.user.username);
        });
    }

    // Terminal Manager
    const qDeptTerminalManager = new Parse.Query("departments");
    qDeptTerminalManager.equalTo("name", "TERMINAL MANAGER");
    let dept_terminal_manager = await qDeptTerminalManager.first();

    if (dept_terminal_manager) {
      const qEmployee = new Parse.Query("employee");

      qEmployee.select("user.username");
      qEmployee.equalTo("department", dept_terminal_manager);

      let employees = await qEmployee.find().catch((err) => {
        results.error_get_employee_in_dept_terminal_manager = err;

        console.error("");
        console.error("Got an error in get employee in Teminal Manager.");
        console.error("Error Code: " + err.code + " : " + err.message);
        console.error("Error Message: " + err.message);

        return results;
      });

      employees &&
        employees.forEach((item) => {
          let employee = item.toJSON();

          emailTo.push(employee.user.username);
        });
    }

    emailTo.push("mromzy@gmail.com");

    let emailto_unique = [...new Set(emailTo)];

    readFile(
      process.cwd() + "/cloud/templates/UpdateWoEmail.html",
      "utf8",
      (err, html) => {
        let template = handlebars.compile(html);

        let replacements = {
          woNumber: wo.number,
          woSubject: wo.subject,
          woStatus: wo.statusticket,
          woRequester:
            wo.requester &&
            `${wo.requester.firstname} ${wo.requester.lastname} [${wo.requester.user.username}]`,
          woAssignTo:
            wo.assignto &&
            `${wo.assignto.firstname} ${wo.assignto.lastname} [${wo.assignto.user.username}]`,
          woCreateBy:
            wo.createdby &&
            `${wo.createdby.firstname} ${wo.createdby.lastname} [${wo.createdby.user.username}]`,
        };

        let htmlToSend = template(replacements);

        //"ptotm.mms@otmerak.com"
        let mailOptions = {
          from: "ptotm.mms@otmerak.com",
          to: emailto_unique.join("; "),
          subject: `Update ${wo.number} : ${wo.statusticket}`,
          html: htmlToSend, // <= for html templated emails
        };

        transporter.sendMail(mailOptions, function (error, response) {
          if (err) {
            results.error_send_email = err;

            console.error("");
            console.error("Got an error in send email.");
            console.error("Error Code: " + err.code + " : " + err.message);
            console.error("Error Message: " + err.message);
          }
        });
      }
    );

    return results;
  });
};
